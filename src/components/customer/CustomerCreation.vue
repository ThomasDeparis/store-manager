<template>
  <side-panel :title="$t('customer.newCustomer')" @close="$emit('close')">
    <q-form @submit="onSubmit" ref="form" class="q-gutter-md q-pa-sm">
      <q-input
        filled
        v-model="customer.name"
        :label="$t('customer.name')"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || $t('forms.mandatory')]"
      />
      <q-input
        filled
        v-model="customer.address"
        :label="$t('customer.address')"
      />
      <q-input
        filled
        v-model="customer.country"
        :label="$t('customer.country')"
      />
      <q-input filled v-model="customer.email" :label="$t('customer.email')" />
      <q-input filled v-model="customer.phone" :label="$t('customer.phone')" />
      <div class="row justify-center">
        <q-btn :label="$t('buttons.create')" type="submit" color="primary" />
      </div>
    </q-form>
  </side-panel>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { useCustomerStore } from 'stores/customer-store';
import { useUserStore } from 'stores/user-store';
import { ICustomer } from 'models/customer/customer';
import { QForm } from 'quasar';

import SidePanel from 'components/common/SidePanel.vue';

export default defineComponent({
  name: 'CustomerCreation',
  emits: ['close', 'customer-created', 'customer-creation-failed'],
  components: { SidePanel },

  setup(_, context) {
    const form = ref<QForm>();
    const customer: Ref<ICustomer> = ref({
      id: '',
      name: '',
      address: '',
      country: '',
      storeId: '',
      email: '',
      phone: '',
    });

    const customerStore = useCustomerStore();
    const userStore = useUserStore();

    const resetValues = () => {
      customer.value.name = '';
      customer.value.address = '';
      customer.value.country = '';
      customer.value.email = '';
      customer.value.phone = '';

      form.value?.resetValidation();
    };

    const onSubmit = async () => {
      try {
        const { storeId, ...otherProps } = customer.value;
        const c = {
          storeId: userStore.currentStore,
          lastChangeUserId: userStore.userData?.uid,
          ...otherProps,
        };

        const createResult = await customerStore.addCustomer(c);
        context.emit('customer-created', createResult);
        resetValues();
      } catch (error) {
        console.log(error);
        context.emit('customer-creation-failed', error);
      }
    };

    return {
      form,
      customer,
      onSubmit,
    };
  },
});
</script>
