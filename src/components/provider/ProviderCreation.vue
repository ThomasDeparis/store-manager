<template>
  <side-panel :title="$t('provider.newProvider')" @close="$emit('close')">
    <q-form @submit="onSubmit" ref="form" class="q-gutter-md q-pa-sm">
      <q-input filled v-model="email" :label="$t('provider.email')" />
      <q-input
        filled
        v-model="name"
        :label="$t('provider.name')"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || $t('forms.mandatory')]"
      />
      <q-input
        filled
        prefix="+33"
        mask="# ## ## ## ##"
        reverse-fill-mask
        v-model="phone"
        :label="$t('provider.phone')"
      />
      <div class="row justify-center">
        <q-btn :label="$t('buttons.create')" type="submit" color="primary" />
      </div>
    </q-form>
  </side-panel>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ref } from 'vue';
import { useProviderStore } from 'stores/provider-store';
import { useUserStore } from 'stores/user-store';
import { IProvider } from 'src/models/provider/provider';
import { QForm } from 'quasar';

import SidePanel from 'components/common/SidePanel.vue';

export default defineComponent({
  name: 'ProviderCreation',
  emits: ['close', 'provider-created', 'provider-creation-failed'],
  components: { SidePanel },

  setup(_, context) {
    const form = ref<QForm>();
    const email = ref('');
    const phone = ref('');
    const name = ref('');

    const providerStore = useProviderStore();
    const userStore = useUserStore();

    const resetValues = () => {
      email.value = '';
      phone.value = '';
      name.value = '';

      form.value?.resetValidation();
    };

    const onSubmit = async () => {
      try {
        const provider = {
          email: email.value,
          phone: phone.value,
          name: name.value,
          storeId: userStore.currentStore,
          lastChangeUserId: userStore.userData?.uid,
        } as IProvider;

        const createResult = await providerStore.addProvider(provider);
        context.emit('provider-created', createResult);
        resetValues();
      } catch (error) {
        context.emit('provider-creation-failed', error);
      }
    };

    return {
      form,
      email,
      phone,
      name,
      onSubmit,
    };
  },
});
</script>
