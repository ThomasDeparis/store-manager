<template>
  <div class="flex justify-evenly">
    <div class="q-pa-md" style="min-width: 30%; max-width: 70%">
      <h4 class="text-center">{{ $t('auth.loginAction') }}</h4>
      <sign-inputs
        :signUpMode="false"
        @onSignFailed="handleSignFail"
        @onSignSuccessful="handleSignOk"
      ></sign-inputs>
    </div>
    <div class="q-pa-md" style="min-width: 30%; max-width: 70%">
      <h4 class="text-center">{{ $t('auth.signUpAction') }}</h4>
      <sign-inputs :signUpMode="true"></sign-inputs>
    </div>
  </div>
</template>

<script>
import SignInputs from 'components/SignInputs.vue';
import { useRouter } from 'vue-router';

import { handleAuthError } from '../utils/auth-error-handler';
import useNotifyHandler from '../hooks/notify-handler';

import { useI18n } from 'vue-i18n';

export default {
  components: {
    SignInputs,
  },

  setup() {
    const router = useRouter();
    const { t } = useI18n();
    const notifier = useNotifyHandler();

    const handleSignFail = (error) =>
      notifier.NotifyError(handleAuthError(error));

    const handleSignOk = () => {
      notifier.NotifySuccess(t('auth.loginOk'));
      router.push({ name: 'index' });
    };

    return {
      handleSignFail,
      handleSignOk,
    };
  },
};
</script>
