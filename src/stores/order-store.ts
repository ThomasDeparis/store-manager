import { defineStore } from 'pinia';
import { IOrder } from 'src/models/order/order';
import { ErrorType } from 'models/errortype';
import { db } from 'src/firebase.config';
import { collection, doc, setDoc, addDoc, Timestamp } from 'firebase/firestore';
import { IOrderError } from 'src/models/order/ordererror';

export const useOrderStore = defineStore('order', {
  state: () => {
    return {};
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
  },
});
