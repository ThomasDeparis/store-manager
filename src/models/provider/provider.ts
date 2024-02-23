export interface IProvider {
  id: string;
  name: string;
  phone: string;
  email: string;
  storeId: string;
  lastChangeUserId?: string;
}

export interface IProviderState {
  providers: IProvider[];
  error?: string | null;
  isLoading: boolean;
}
