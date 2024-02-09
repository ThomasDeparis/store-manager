import { User } from 'firebase/auth';

export interface IUserState {
  userData?: User | null;
  didAutoLogout: boolean;
  error?: string | null;
  isLoading: boolean;
  currentStore: string;
}
