<template>
  <q-input
    suffix="€"
    mask="#.##"
    fill-mask="0"
    reverse-fill-mask
    input-class="text-right"
    :rules="[(val) => val >= 0.0 || $t('order.enterValidBuyPrice')]"
    class="col-6 q-pa-sm"
    v-model="price"
    :label="label"
    dense
    lazy-rules
  />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
export default defineComponent({
  name: 'PriceInput',
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const formatPrice = (value: string | number) => Number(value)?.toFixed(2);
    const price = ref(formatPrice(props.modelValue));

    watch(
      () => props.modelValue,
      (newValue) => {
        price.value = formatPrice(newValue);
      }
    );

    // force to type number
    watch(
      () => price.value,
      (newPrice) => {
        emit('update:modelValue', formatPrice(newPrice));
      }
    );

    return {
      price,
    };
  },
});
</script>
