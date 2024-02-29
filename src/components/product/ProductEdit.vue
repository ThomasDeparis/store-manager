<template>
  <side-panel :title="$t('product.detail')" @close="$emit('close')">
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
        v-model="editing.reference"
        :label="$t('product.reference')"
        readonly
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || $t('forms.mandatory')]"
      />
      <q-input
        filled
        v-model="editing.providerReference"
        :readonly="isReadonly"
        :label="$t('product.providerReference')"
      />
      <q-input
        filled
        v-model="editing.name"
        :label="$t('product.name')"
        :readonly="isReadonly"
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
        :readonly="isReadonly"
        lazy-rules
        :rules="[
          (val) =>
            (val !== null && val !== '' && val > 0) ||
            $t('product.enterValidSellPrice'),
        ]"
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
import { useProductStore } from 'stores/product-store';
import { useUserStore } from 'stores/user-store';
import { IProduct } from 'src/models/product/product';

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
  emits: [
    'close',
    'update:modelValue',
    'update:readonlyMode',
    'product-edit-failed',
  ],
  components: { SidePanel },

  setup(props, context) {
    const editing = computed(() => props.modelValue);

    const isReadonly = toRef<boolean>(props.readonlyMode);
    watchEffect(() => (isReadonly.value = props.readonlyMode));

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
      editing,
      isReadonly,
      onSubmit,
    };
  },
});
</script>
