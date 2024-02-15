<template>
  <side-panel :title="$t('product.newProduct')" @close="$emit('close')">
    <q-form @submit="onSubmit" ref="form" class="q-gutter-md q-pa-sm">
      <q-input
        filled
        v-model="reference"
        :label="$t('product.reference')"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || $t('forms.mandatory')]"
      />
      <q-input
        filled
        v-model="providerReference"
        :label="$t('product.providerReference')"
      />
      <q-input
        filled
        v-model="name"
        :label="$t('product.name')"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || $t('forms.mandatory')]"
      />
      <q-input
        filled
        suffix="€"
        mask="#.##"
        fill-mask="0"
        reverse-fill-mask
        v-model="sellPrice"
        input-class="text-right"
        :label="$t('product.sellPrice')"
        lazy-rules
        :rules="[
          (val) =>
            (val !== null && val !== '' && val > 0) ||
            $t('product.enterValidSellPrice'),
        ]"
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
import { useProductStore } from 'stores/product-store';
import { useUserStore } from 'stores/user-store';
import { IProduct } from 'src/models/product';
import { QForm } from 'quasar';

import SidePanel from 'components/common/SidePanel.vue';

export default defineComponent({
  name: 'ProductCreation',
  emits: ['close', 'product-created', 'product-creation-failed'],
  components: { SidePanel },

  setup(_, context) {
    const form = ref<QForm>();
    const reference = ref('');
    const providerReference = ref('');
    const sellPrice = ref(0.0);
    const name = ref('');

    const productStore = useProductStore();
    const userStore = useUserStore();

    const resetValues = () => {
      reference.value = '';
      providerReference.value = '';
      sellPrice.value = 0.0;
      name.value = '';

      form.value?.resetValidation();
    };

    const onSubmit = async () => {
      try {
        const product = {
          reference: reference.value,
          providerReference: providerReference.value,
          sellPrice: sellPrice.value,
          name: name.value,
          quantity: 0,
          storeId: userStore.currentStore,
          lastChangeUserId: userStore.userData?.uid,
        } as IProduct;

        const createResult = await productStore.addProduct(product);
        context.emit('product-created', createResult);
        resetValues();
      } catch (error) {
        context.emit('product-creation-failed', error);
      }
    };

    return {
      form,
      reference,
      providerReference,
      sellPrice,
      name,
      onSubmit,
    };
  },
});
</script>
