import { ErrorType } from '../errortype';

export interface IOrderError {
  message: string;
  errorType: ErrorType;
  OrderReference?: string | null;
}
