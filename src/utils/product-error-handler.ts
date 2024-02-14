import { IProductError, ProductErrorKey } from 'models/producterror';
import { ErrorType } from 'models/errortype';
import { t } from 'src/i18n';

export function handleProductError(originalError: IProductError) {
  if (originalError.errorType === ErrorType.Technical) {
    console.log(originalError);
    return t('common.technicalError');
  } else if (originalError?.messageKey === ProductErrorKey.ReferenceExists) {
    return t('product.referenceExists');
  } else {
    return t('common.technicalError');
  }
}
