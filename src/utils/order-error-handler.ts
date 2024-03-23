import { IOrderError } from 'models/order/ordererror';

import { t } from 'src/i18n';

export function handleOrderError(originalError: IOrderError): string {
  console.log(originalError);
  return t('common.technicalError');
}
