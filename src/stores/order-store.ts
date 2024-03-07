import { defineStore } from 'pinia';
import { IOrder } from 'src/models/order/order';
// import { IOrderError } from 'models/order/ordererror';
import { ErrorType } from 'models/errortype';
import { db } from 'src/firebase.config';
import { collection, doc, setDoc } from 'firebase/firestore';
import { IProviderError } from 'src/models/provider/providererror';

export const useOrderStore = defineStore('order', {
  state: () => {
    return {};
  },
  actions: {
    async addOrder(order: IOrder) {
      try {
        const newOrder = doc(collection(db, 'orders'));
        order.id = newOrder.id; //copy the generated document id into id field
        await setDoc(newOrder, order);

        //TODO : save products as collection, not as array in order
      } catch (error: any) {
        console.log(error);
        const pError = {
          productReference: order.reference,
          errorType: ErrorType.Technical,
          message: error.toString(),
        } as IProviderError;

        throw pError;
      }
    },
  },
});
