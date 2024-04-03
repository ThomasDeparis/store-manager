export interface IOrderRow {
  id: string;
  productId: string;
  productName: string;
  productReference: string;
  orderedQty: number;
  receivedQty?: number;
  unitPrice: number;
}

export interface IOrder {
  id: string;
  reference: string;
  orderDate: Date;
  storeId: string;
  products: IOrderRow[];
}

export interface IRecipient {
  id: string;
  name: string;
}
export interface IGenericOrder extends IOrder {
  recipientId: string;
}

export interface IProviderOrder extends IOrder {
  providerId: string;
  receiptDate?: Date;
}

export interface ISale extends IOrder {
  customerId: string;
}

export interface IOrderState {
  providerOrders: IProviderOrder[];
  customerOrders: ISale[];
  isLoading: boolean;
  storeId: string;
}
