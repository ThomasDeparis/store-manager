import { defineStore } from 'pinia';
import { IProductState, IProduct } from '../models/product';
import { IProductError, ProductErrorKey } from '../models/producterror';
import { ErrorType } from '../models/errortype';
import { db } from '../firebase.config';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
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
  },
});
