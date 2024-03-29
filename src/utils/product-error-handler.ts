import {
  IProductError,
  ProductErrorKey,
} from 'src/models/product/producterror';
import { ErrorType } from 'models/errortype';
import { t } from 'src/i18n';

export function handleProductError(originalError: IProductError): string {
  if (originalError.errorType === ErrorType.Technical) {
    console.log(originalError);
    return t('common.technicalError');
  } else if (originalError?.messageKey === ProductErrorKey.ReferenceExists) {
    return t('product.referenceExists');
  } else {
    return t('common.technicalError');
  }
}
