import { AuthError } from '../models/autherror';
import { t } from '../i18n';

function getErrorToDisplay(originalError: AuthError) {
  if (originalError?.message.toLowerCase().includes('invalid-credential')) {
    return t('auth.badLogin');
  } else {
    return t('auth.technicalError');
  }
}

export function handleAuthError(originalError: AuthError) {
  console.log(originalError?.message);
  return getErrorToDisplay(originalError);
}
