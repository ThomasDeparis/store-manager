import { AuthError } from 'models/autherror';
import { t } from 'src/i18n';

function getErrorToDisplay(originalError: AuthError) {
  if (originalError?.message.toLowerCase().includes('invalid-credential')) {
    return t('auth.badLogin');
  } else if (originalError?.message.toLowerCase().includes('weak-password')) {
    return t('auth.weakPassword');
  } else {
    return t('auth.technicalError');
  }
}

export function handleAuthError(originalError: AuthError) {
  console.log(originalError?.message);
  return getErrorToDisplay(originalError);
}
