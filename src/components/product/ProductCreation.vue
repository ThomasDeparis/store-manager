<template>
  <side-panel :title="$t('product.newProduct')" @close="$emit('close')">
    <q-form @submit="onSubmit" ref="form" class="q-gutter-md q-pa-sm">
      <q-input
        filled
        v-model="formFields.reference"
        :label="$t('product.reference')"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || $t('forms.mandatory')]"
      />
      <q-input
        filled
        v-model="formFields.providerReference"
        :label="$t('product.providerReference')"
      />
      <q-input
        filled
        v-model="formFields.name"
        :label="$t('product.name')"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || $t('forms.mandatory')]"
      />
      <price-input v-model="formFields.sellPrice" />
      <div class="row justify-center">
        <q-btn :label="$t('buttons.create')" type="submit" color="primary" />
      </div>
    </q-form>
  </side-panel>
</template>

<script lang="ts">
import { defineComponent, PropType, watch } from 'vue';
import { ref } from 'vue';
import { useProductStore } from 'stores/product-store';
import { useUserStore } from 'stores/user-store';
import { IProduct } from 'models/product/product';
import { QForm } from 'quasar';

import SidePanel from 'components/common/SidePanel.vue';
import PriceInput from 'components/common/PriceInput.vue';

export default defineComponent({
  name: 'ProductCreation',
  props: {
    modelValue: {
      type: Object as PropType<IProduct>,
      required: false,
    },
  },
  emits: ['close', 'update:modelValue', 'product-creation-failed'],
  components: { SidePanel, PriceInput },

  setup(props, context) {
    const form = ref<QForm>();

    const formFields = ref({
      reference: '',
      providerReference: '',
      sellPrice: 0.0,
      name: '',
    });

    watch(
      () => props.modelValue,
      (newValue) => {
        formFields.value.reference = newValue?.reference || '';
        formFields.value.providerReference = newValue?.providerReference || '';
        formFields.value.name = newValue?.name || '';
        formFields.value.sellPrice = newValue?.sellPrice || 0.0;
      }
    );

    const productStore = useProductStore();
    const userStore = useUserStore();

    const resetValues = () => {
      formFields.value.reference = '';
      formFields.value.providerReference = '';
      formFields.value.sellPrice = 0.0;
      formFields.value.name = '';

      form.value?.resetValidation();
    };

    const onSubmit = async () => {
      try {
        const product = {
          quantity: 0,
          storeId: userStore.currentStore,
          lastChangeUserId: userStore.userData?.uid,
          ...formFields.value,
        } as IProduct;

        const createResult = await productStore.addProduct(product);
        resetValues();
        context.emit('update:modelValue', createResult);
      } catch (error) {
        context.emit('product-creation-failed', error);
      }
    };

    return {
      form,
      formFields,
      onSubmit,
    };
  },
});
</script>
