<template>
  <side-panel :title="$t('product.detail')" @close="$emit('close')">
    <q-form @submit="onSubmit" ref="form" class="q-gutter-md q-pa-sm">
      <q-input
        filled
        v-model="editing.reference"
        :label="$t('product.reference')"
        readonly
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || $t('forms.mandatory')]"
      />
      <q-input
        filled
        v-model="editing.providerReference"
        :readonly="readonlyMode"
        :label="$t('product.providerReference')"
      />
      <q-input
        filled
        v-model="editing.name"
        :label="$t('product.name')"
        :readonly="readonlyMode"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || $t('forms.mandatory')]"
      />
      <q-input
        filled
        suffix="€"
        mask="#.##"
        fill-mask="0"
        reverse-fill-mask
        v-model="editing.sellPrice"
        input-class="text-right"
        :label="$t('product.sellPrice')"
        :readonly="readonlyMode"
        lazy-rules
        :rules="[
          (val) =>
            (val !== null && val !== '' && val > 0) ||
            $t('product.enterValidSellPrice'),
        ]"
      />
      <div class="row justify-center">
        <q-btn
          v-if="!readonlyMode"
          :label="$t('buttons.edit')"
          type="submit"
          color="primary"
        />
      </div>
    </q-form>
  </side-panel>
</template>

<script lang="ts">
import { ref, defineComponent, PropType, computed } from 'vue';
import { useProductStore } from 'stores/product-store';
import { useUserStore } from 'stores/user-store';
import { IProduct } from 'src/models/product';
import { QForm } from 'quasar';

import SidePanel from 'components/common/SidePanel.vue';

export default defineComponent({
  name: 'ProductEdit',
  props: {
    readonlyMode: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Object as PropType<IProduct>,
      required: true,
    },
  },
  emits: ['close', 'update:modelValue', 'product-edit-failed'],
  components: { SidePanel },

  setup(props, context) {
    const form = ref<QForm>();
    const editing = computed(() => props.modelValue);

    const productStore = useProductStore();
    const userStore = useUserStore();

    const onSubmit = async () => {
      try {
        editing.value.lastChangeUserId = userStore.userData?.uid;

        await productStore.editProduct(editing.value);
        context.emit('update:modelValue', editing.value);
      } catch (error) {
        context.emit('product-edit-failed', error);
      }
    };

    return {
      form,
      editing,
      // reference,
      // providerReference,
      // sellPrice,
      // name,
      onSubmit,
    };
  },
});
</script>
