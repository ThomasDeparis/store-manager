<template>
  <side-panel :title="$t('customer.detail')" @close="$emit('close')">
    <div class="row">
      <q-toggle
        class=""
        :model-value="isReadonly"
        color="green"
        :label="$t('forms.editMode')"
        :true-value="false"
        :false-value="true"
        @update:model-value="$emit('update:readonlyMode', isReadonly)"
      />
    </div>
    <q-form @submit="onSubmit" ref="form" class="q-gutter-md q-pa-sm">
      <q-input
        filled
        v-model="editing.name"
        :label="$t('customer.name')"
        :readonly="isReadonly"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || $t('forms.mandatory')]"
      />
      <q-input
        filled
        v-model="editing.address"
        :readonly="isReadonly"
        :label="$t('customer.address')"
      />
      <q-input
        filled
        v-model="editing.country"
        :readonly="isReadonly"
        :label="$t('customer.country')"
      />
      <q-input
        filled
        v-model="editing.email"
        :readonly="isReadonly"
        :label="$t('customer.email')"
      />
      <q-input
        filled
        v-model="editing.phone"
        :label="$t('customer.phone')"
        :readonly="isReadonly"
      />
      <div class="row justify-center">
        <q-btn
          v-if="!isReadonly"
          :label="$t('buttons.edit')"
          type="submit"
          color="primary"
        />
      </div>
    </q-form>
  </side-panel>
</template>

<script lang="ts">
import { toRef, defineComponent, PropType, computed, watchEffect } from 'vue';
import { useCustomerStore } from 'stores/customer-store';
import { useUserStore } from 'stores/user-store';
import { ICustomer } from 'models/customer/customer';

import SidePanel from 'components/common/SidePanel.vue';

export default defineComponent({
  name: 'CustomerEdit',
  props: {
    readonlyMode: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Object as PropType<ICustomer>,
      required: true,
    },
  },
  emits: [
    'close',
    'update:modelValue',
    'update:readonlyMode',
    'customer-edit-failed',
  ],
  components: { SidePanel },

  setup(props, context) {
    const editing = computed(() => props.modelValue);

    const isReadonly = toRef<boolean>(props.readonlyMode);
    watchEffect(() => (isReadonly.value = props.readonlyMode));

    const customerStore = useCustomerStore();
    const userStore = useUserStore();

    const onSubmit = async () => {
      try {
        editing.value.lastChangeUserId = userStore.userData?.uid;

        await customerStore.editCustomer(editing.value);
        context.emit('update:modelValue', editing.value);
      } catch (error) {
        context.emit('customer-edit-failed', error);
      }
    };

    return {
      editing,
      isReadonly,
      onSubmit,
    };
  },
});
</script>
