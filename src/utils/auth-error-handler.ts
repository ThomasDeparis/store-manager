import { AuthError } from 'models/autherror';
import { t } from 'src/i18n';

function getErrorToDisplay(originalError: AuthError): string {
  const errorMsg = originalError?.message.toLowerCase();
  if (errorMsg.includes('invalid-credential')) {
    return t('auth.badLogin');
  } else if (errorMsg.includes('weak-password')) {
    return t('auth.weakPassword');
  } else if (errorMsg.includes('email-already-in-use')) {
    return t('auth.emailExists');
  } else {
    return t('auth.technicalError');
  }
}

export function handleAuthError(originalError: AuthError): string {
  console.log(originalError?.message);
  return getErrorToDisplay(originalError);
}
