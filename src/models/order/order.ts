export interface IOrderRow {
  productId: string;
  productName: string;
  productReference: string;
  orderedQty: number;
  receivedQty?: number;
  unitPrice: number;
}

export interface IOrder {
  id: string;
  providerId: string;
  reference: string;
  orderDate: Date;
  receiptDate?: Date;
  storeId: string;
  products: IOrderRow[];
}
