import { defineStore } from 'pinia';
import {
  ICustomerOrder,
  IOrder,
  IOrderRow,
  IOrderState,
  IProviderOrder,
} from 'models/order/order';
import { ErrorType } from 'models/errortype';
import { db } from 'src/firebase.config';
import {
  collection,
  doc,
  Timestamp,
  query,
  where,
  getDocs,
  writeBatch,
  WriteBatch,
} from 'firebase/firestore';
import { IOrderError } from 'src/models/order/ordererror';

import { useProductStore } from './product-store';
import { IProductStockLog } from 'src/models/product/product';

const addOrderMainInfo = (
  batch: WriteBatch,
  order: IProviderOrder | ICustomerOrder
): WriteBatch => {
  const newOrder = doc(collection(db, 'orders'));
  order.id = newOrder.id; //copy the generated document id into id field

  const { orderDate, products, ...otherInfo } = order;
  batch.set(newOrder, {
    orderDate: Timestamp.fromDate(orderDate),
    ...otherInfo,
  });

  //order's products in sub collection
  const productsCol = collection(newOrder, 'products');
  for (const p of products ?? []) {
    const newProduct = doc(productsCol);
    p.id = newProduct.id;
    batch.set(newProduct, p);
  }

  return batch;
};

export const useOrderStore = defineStore('order', {
  state: (): IOrderState => {
    return {
      orders: [],
      isLoading: false,
      storeId: '',
    };
  },
  actions: {
    async addProviderOrder(order: IProviderOrder) {
      try {
        const batch = writeBatch(db);
        await addOrderMainInfo(batch, order).commit();
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
    async addCustomerOrder(order: ICustomerOrder) {
      const productStore = useProductStore();
      const validationDate = Timestamp.now();

      try {
        let batch = writeBatch(db);
        batch = addOrderMainInfo(batch, order);

        //update products quantities
        for (const p of order.products) {
          const stockLog = {
            type: 'sale',
            adjustment: -Math.abs(p.orderedQty),
            date: validationDate,
            documentId: order.id,
          } as IProductStockLog;
          await productStore.updateStock(p.productId, stockLog, batch);
        }
        await batch.commit();
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
            adjustment: Math.abs(p.receivedQty || 0),
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
        const storeOrder = <IProviderOrder>this.orders[i];
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
