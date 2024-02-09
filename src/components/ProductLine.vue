<template>
  <div class="row justify-around">
    <div class="col-4">: {{ product?.id }}</div>
    <div class="col-4">
      {{ product?.name }}
    </div>
    <div class="col-4">Qty : {{ product?.quantity }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type { IProduct } from '../models/product';

export default defineComponent({
  props: {
    product: { type: Object as PropType<IProduct>, required: true },
  },

  setup() {
    return {};
  },
});
</script>
