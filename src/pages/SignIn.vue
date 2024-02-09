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
import { NotifyError, NotifySuccess } from '../utils/notify-handler';

import { useI18n } from 'vue-i18n';

export default {
  components: {
    SignInputs,
  },

  setup() {
    const router = useRouter();
    const { t } = useI18n();

    const handleSignFail = (error) => NotifyError(handleAuthError(error));

    const handleSignOk = () => {
      NotifySuccess(t('auth.loginOk'));
      router.push('/');
    };

    return {
      handleSignFail,
      handleSignOk,
    };
  },
};
</script>
