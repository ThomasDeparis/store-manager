import { defineStore } from 'pinia';
import { IOrder, IOrderRow, IOrderState } from 'src/models/order/order';
import { ErrorType } from 'models/errortype';
import { db } from 'src/firebase.config';
import {
  collection,
  doc,
  setDoc,
  Timestamp,
  query,
  where,
  getDocs,
  writeBatch,
} from 'firebase/firestore';
import { IOrderError } from 'src/models/order/ordererror';

import { useProductStore } from './product-store';
import { IProductStockLog } from 'src/models/product/product';

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
        for (const p of order?.products ?? []) {
          const newProduct = doc(productsCol);
          p.id = newProduct.id;
          await setDoc(newProduct, p);
        }

        this.orders.push(order);
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
      this.orders = [];
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

    async loadOrderProducts(orderId: string): Promise<IOrder> {
      const order = this.orders.find((o) => o.id === orderId);

      if (!order) {
        const oError = {
          orderReference: orderId,
          errorType: ErrorType.Technical,
          message: 'loadOrderProducts : order was not found in store',
        } as IOrderError;

        console.log(oError);
        throw oError;
      }

      this.isLoading = true;
      const productsCollection = collection(db, 'orders', orderId, 'products');
      const querySnapshot = await getDocs(productsCollection);
      order.products = querySnapshot.docs.map(function (p) {
        return {
          id: p.data()?.id,
          productId: p.data()?.productId,
          productName: p.data()?.productName,
          productReference: p.data()?.productReference,
          orderedQty: p.data()?.orderedQty,
          receivedQty: p.data()?.receivedQty,
          unitPrice: p.data()?.unitPrice,
        } as IOrderRow;
      });
      this.isLoading = false;
      return order;
    },
    async validateReceipt(orderId: string, orderProducts: IOrderRow[]) {
      const productStore = useProductStore();
      const validationDate = Timestamp.now();

      try {
        const batch = writeBatch(db);

        const orderDoc = doc(db, 'orders', orderId);
        batch.update(orderDoc, { receiptDate: validationDate });

        for (const p of orderProducts) {
          const orderProductDoc = doc(db, 'orders', orderId, 'products', p.id);
          batch.update(orderProductDoc, { receivedQty: p.receivedQty });

          const stockLog = {
            type: 'order',
            adjustment: p.receivedQty,
            date: validationDate,
            documentId: orderId,
          } as IProductStockLog;
          await productStore.updateStock(p.productId, stockLog, batch);
        }

        await batch.commit();

        //update order in store
        const i = this.orders.findIndex((o) => o.id === orderId);
        if (i < 0) {
          const error = {
            productReference: orderId,
            errorType: ErrorType.Technical,
            message:
              'OrderStore.validateReceipt : cannot find order in store to edit it',
          } as IOrderError;

          throw error;
        }
        const storeOrder = this.orders[i];
        storeOrder.receiptDate = validationDate.toDate();
      } catch (e: any) {
        console.log(e);
        const oError = {
          orderReference: orderId,
          errorType: ErrorType.Technical,
          message: `validateReceipt : ${e?.message}`,
        } as IOrderError;

        throw oError;
      }
    },
  },
});
