import { ErrorType } from './errortype';

export enum ProductErrorKey {
  ReferenceExists,
}

export interface IProductError {
  messageKey?: ProductErrorKey | null;
  message: string;
  errorType: ErrorType;
  productReference?: string | null;
}
