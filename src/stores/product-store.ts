import { defineStore } from 'pinia';
import { IProductState, IProduct, IProductEdit } from 'models/product';
import { IProductError, ProductErrorKey } from 'models/producterror';
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
} from 'firebase/firestore';

export const useProductStore = defineStore('product', {
  state: (): IProductState => {
    return {
      products: [],
      error: null,
      isLoading: false,
    };
  },
  actions: {
    async loadProducts(storeId: string) {
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
        };
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
  },
});
