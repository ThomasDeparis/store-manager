import { ErrorType } from '../errortype';

export interface ICustomerError {
  message: string;
  errorType: ErrorType;
  customerName?: string | null;
}
