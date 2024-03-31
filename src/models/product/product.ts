import { Timestamp } from 'firebase/firestore';

export type ProductStockLogType = 'order' | 'sale';

export interface IProductStockLog {
  id: string;
  type: ProductStockLogType;
  initialQuantity: number;
  adjustment: number;
  date: Timestamp;
  documentId?: string;
}

export interface IProduct {
  id: string;
  name: string;
  quantity: number;
  sellPrice: number;
  reference: string;
  providerReference?: string;
  storeId: string;
  lastChangeUserId?: string;
  stockLogs?: IProductStockLog[];
}

export interface ProductListFilter {
  storeId: string;
}

export interface IProductState {
  products: IProduct[];
  error?: string | null;
  isLoading: boolean;
  storeId: string;
}

export interface IProductEdit {
  id: string;
  name: string;
  reference: string;
  sellPrice: number;
  providerReference?: string;
  lastChangeUserId?: string;
  storeId: string;
}
