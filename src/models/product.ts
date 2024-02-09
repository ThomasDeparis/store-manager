export interface IProduct {
  id: string;
  name: string;
  quantity: number;
  sellPrice: number;
  reference: string;
  providerReference?: string;
  storeId: string;
  lastChangeUserId: string;
}

export interface ProductListFilter {
  storeId: string;
}

export interface IProductState {
  products: IProduct[];
  error?: string | null;
  isLoading: boolean;
}
