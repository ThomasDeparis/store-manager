import { useQuasar } from 'quasar';

export default function useNotifyHandler() {
  const $q = useQuasar();

  const NotifySuccess = (message: string) => {
    $q.notify({
      color: 'green-5',
      textColor: 'white',
      icon: 'cloud_done',
      message,
    });
  };

  const NotifyError = (message: string) => {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'error',
      message,
    });
  };

  return {
    NotifySuccess,
    NotifyError,
  };
}
