import { ErrorType } from '../errortype';

export interface IProviderError {
  message: string;
  errorType: ErrorType;
  providerName?: string | null;
}
