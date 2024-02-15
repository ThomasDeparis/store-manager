export interface IProduct {
  id: string;
  name: string;
  quantity: number;
  sellPrice: number;
  reference: string;
  providerReference?: string;
  storeId: string;
  lastChangeUserId?: string;
}

export interface ProductListFilter {
  storeId: string;
}

export interface IProductState {
  products: IProduct[];
  error?: string | null;
  isLoading: boolean;
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
