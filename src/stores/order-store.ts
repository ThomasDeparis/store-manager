import { defineStore } from 'pinia';
import { IOrder, IOrderState } from 'src/models/order/order';
import { ErrorType } from 'models/errortype';
import { db } from 'src/firebase.config';
import {
  collection,
  doc,
  setDoc,
  addDoc,
  Timestamp,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { IOrderError } from 'src/models/order/ordererror';

export const useOrderStore = defineStore('order', {
  state: (): IOrderState => {
    return {
      orders: [],
      error: null,
      isLoading: false,
      storeId: '',
    };
  },
  actions: {
    async addOrder(order: IOrder) {
      try {
        const newOrder = doc(collection(db, 'orders'));
        order.id = newOrder.id; //copy the generated document id into id field
        await setDoc(newOrder, {
          id: order.id,
          providerId: order.providerId,
          reference: order.reference,
          orderDate: Timestamp.fromDate(order.orderDate),
          storeId: order.storeId,
        });

        //order's products in sub collection
        const productsCol = collection(newOrder, 'products');
        for (const p of order.products) {
          await addDoc(productsCol, p);
        }
      } catch (error: any) {
        console.log(error);
        const pError = {
          orderReference: order.reference,
          errorType: ErrorType.Technical,
          message: error.toString(),
        } as IOrderError;

        throw pError;
      }
    },
    async loadOrders(storeId: string) {
      this.isLoading = true;
      this.storeId = storeId;
      const providersCol = collection(db, 'orders');
      const q = query(providersCol, where('storeId', '==', storeId));
      const querySnapshot = await getDocs(q);
      this.orders = querySnapshot.docs.map(function (p) {
        return {
          id: p.id,
          reference: p.data()?.reference,
          orderDate: p.data()?.orderDate?.toDate(),
          receiptDate: p.data()?.receiptDate?.toDate(),
          providerId: p.data()?.providerId,
          storeId: p.data()?.storeId,
          products: [],
        } as IOrder;
      });
      this.isLoading = false;
    },
  },
});
