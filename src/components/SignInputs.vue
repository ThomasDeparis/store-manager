<template>
  <q-form @submit.prevent="onSubmit" @reset="onReset" class="q-gutter-md">
    <q-input
      filled
      type="email"
      v-model="email"
      :label="$t('forms.yourEmail')"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || $t('forms.mandatory')]"
    />

    <q-input
      filled
      type="password"
      v-model="password"
      :label="$t('forms.yourPassword')"
      lazy-rules
      :rules="[(val) => (val && val.length > 0) || $t('forms.mandatory')]"
    />
    <q-input
      v-if="signUpMode"
      filled
      type="password"
      v-model="passwordRepeat"
      :label="$t('forms.repeatPassword')"
      lazy-rules
      :rules="[passwordRepeatRule]"
    />

    <div class="flex flex-center">
      <q-btn :label="validateButtonLabel" type="submit" color="primary" />
      <q-btn
        :label="$t('buttons.reset')"
        type="reset"
        color="primary"
        flat
        class="q-ml-sm"
      />
    </div>
  </q-form>
</template>

<script>
import { ref, watch, computed } from 'vue';
import { useUserStore } from '../stores/user-store.ts';
import { useI18n } from 'vue-i18n';

export default {
  name: 'SignInputs',
  props: ['signUpMode'],
  emits: ['onSignSuccessful', 'onSignFailed'],

  setup(props, context) {
    const { t } = useI18n();
    const email = ref(null);
    const password = ref(null);
    const passwordRepeat = ref(null);

    const validateButtonLabel = props.signUpMode
      ? t('auth.signUpAction')
      : t('auth.loginAction');

    const passwordRepeatRule = () => {
      return (
        (passwordRepeat?.value &&
          passwordRepeat?.value.length > 0 &&
          passwordRepeat?.value === password?.value) ||
        t('forms.repeatCorrectlyPassword')
      );
    };

    const userStore = useUserStore();

    const onSubmit = () => {
      props.signUpMode
        ? userStore.signUp(email.value, password.value)
        : userStore.signIn(email.value, password.value);
    };

    const error = computed(() => userStore.error);
    const isLoading = computed(() => userStore.isLoading);

    const emitSignResults = () => {
      !!error.value
        ? context.emit('onSignFailed', error.value)
        : context.emit('onSignSuccessful');
    };

    watch(isLoading, (newLoading, oldLoading) => {
      if (oldLoading && !newLoading) {
        emitSignResults();
      }
    });

    const onReset = () => {
      email.value = null;
      password.value = null;
      passwordRepeat.value = null;
    };

    return {
      email,
      password,
      passwordRepeat,
      passwordRepeatRule,
      validateButtonLabel,
      onSubmit,
      onReset,
    };
  },
};
</script>
