import { defineStore } from 'pinia';
import {
  IProductState,
  IProduct,
  IProductEdit,
  IProductStockLog,
} from 'src/models/product/product';
import {
  IProductError,
  ProductErrorKey,
} from 'src/models/product/producterror';
import { ErrorType } from 'models/errortype';
import { db } from 'src/firebase.config';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  writeBatch,
  WriteBatch,
} from 'firebase/firestore';

export const useProductStore = defineStore('product', {
  state: (): IProductState => {
    return {
      products: [],
      error: null,
      isLoading: false,
      storeId: '',
    };
  },
  actions: {
    async loadProducts(storeId: string) {
      this.storeId = storeId;
      this.products = [];
      this.isLoading = true;
      const productsCol = collection(db, 'products');
      const q = query(productsCol, where('storeId', '==', storeId));
      const querySnapshot = await getDocs(q);
      this.products = querySnapshot.docs.map(function (p) {
        return {
          id: p.id,
          name: p.data().name,
          quantity: p.data().quantity,
          sellPrice: p.data().sellPrice,
          reference: p.data().reference,
          providerReference: p.data().providerReference,
          storeId: p.data().storeId,
          lastChangeUserId: p.data().lastChangeUserId,
        } as IProduct;
      });
      this.isLoading = false;
    },
    async referenceExists(
      storeId: string,
      productReference: string
    ): Promise<boolean> {
      const productsCol = collection(db, 'products');
      const q = query(
        productsCol,
        where('storeId', '==', storeId),
        where('reference', '==', productReference)
      );
      const querySnapshot = await getDocs(q);

      return !querySnapshot.empty;
    },
    async addProduct(product: IProduct) {
      const alreadyExists = await this.referenceExists(
        product.storeId,
        product.reference
      );
      if (alreadyExists) {
        const error = {
          messageKey: ProductErrorKey.ReferenceExists,
          productReference: product.reference,
          errorType: ErrorType.Business,
        } as IProductError;
        throw error;
      }

      try {
        const newProduct = doc(collection(db, 'products'));
        product.id = newProduct.id; //copy the generated document id into id field
        await setDoc(newProduct, product);

        this.products.push(product);
      } catch (error: any) {
        const pError = {
          productReference: product.reference,
          errorType: ErrorType.Technical,
          message: error.toString(),
        } as IProductError;

        throw pError;
      }
    },
    async editProduct(edited: IProductEdit) {
      try {
        const productDoc = doc(collection(db, 'products'), edited.id);

        await updateDoc(productDoc, {
          name: edited.name,
          providerReference: edited.providerReference,
          sellPrice: edited.sellPrice,
          lastChangeUserId: edited.lastChangeUserId,
        });

        const i = this.products.findIndex(
          (p) => p.id === edited.id && p.storeId === edited.storeId
        );
        if (i < 0) {
          const error = {
            productReference: edited.reference,
            errorType: ErrorType.Technical,
            message:
              'productStore.editProduct : cannot find product in store to edit it',
          } as IProductError;

          throw error;
        }
        console.log(edited);
        console.log(edited.sellPrice);
        const storeProduct = this.products[i];
        storeProduct.name = edited.name;
        storeProduct.providerReference = edited.providerReference;
        storeProduct.sellPrice = edited.sellPrice;
        storeProduct.lastChangeUserId = edited.lastChangeUserId;
      } catch (error: any) {
        const pError = {
          productReference: edited.reference,
          errorType: ErrorType.Technical,
          message: error.toString(),
        } as IProductError;

        throw pError;
      }
    },
    async updateStock(
      productId: string,
      stockAdjustment: IProductStockLog,
      globalBatch?: WriteBatch
    ) {
      try {
        const productDoc = doc(db, 'products', productId);
        const productSnap = await getDoc(productDoc);

        const batch = globalBatch || writeBatch(db);

        const newStockLogDoc = doc(
          collection(db, 'products', productId, 'stockLogs')
        );

        stockAdjustment.id = newStockLogDoc.id; //copy the generated document id into id field
        stockAdjustment.initialQuantity = Number(
          productSnap?.data()?.quantity || 0
        );
        batch.set(newStockLogDoc, stockAdjustment);

        const newQty: number =
          (stockAdjustment.initialQuantity || 0) + stockAdjustment.adjustment;
        batch.update(productDoc, {
          quantity: newQty,
        });

        if (globalBatch === undefined) {
          console.log('commit update stock');
          await batch.commit();
        }
      } catch (error: any) {
        const pError = {
          productReference: productId,
          errorType: ErrorType.Technical,
          message: error.toString(),
        } as IProductError;

        throw pError;
      }
    },
  },
});
