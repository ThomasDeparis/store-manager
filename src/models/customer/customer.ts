export interface ICustomer {
  id: string;
  name: string;
  address?: string;
  country?: string;
  storeId: string;
  lastChangeUserId?: string;
}

export interface ICustomerState {
  customers: ICustomer[];
  isLoading: boolean;
  storeId: string;
}
