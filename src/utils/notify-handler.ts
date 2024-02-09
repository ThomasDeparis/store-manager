import { useQuasar } from 'quasar';

const $q = useQuasar();

export function NotifySuccess(message: string) {
  $q.notify({
    color: 'green-5',
    textColor: 'white',
    icon: 'cloud_done',
    message,
  });
}

export function NotifyError(message: string) {
  $q.notify({
    color: 'red-5',
    textColor: 'white',
    icon: 'error',
    message,
  });
}
