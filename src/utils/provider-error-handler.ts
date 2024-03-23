import { IProviderError } from 'models/provider/providererror';

import { t } from 'src/i18n';

export function handleProviderError(originalError: IProviderError): string {
  console.log(originalError);
  return t('common.technicalError');
}
