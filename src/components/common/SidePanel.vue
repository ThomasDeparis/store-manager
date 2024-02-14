<template>
  <div class="row items-center justify-between q-pa-md bg-primary">
    <div class="col-8 text-uppercase text-subtitle2 text-white">
      {{ title }}
    </div>
    <div class="col-1">
      <q-btn
        round
        push
        size="sm"
        icon="close"
        color="primary"
        @click="$emit('close')"
      ></q-btn>
    </div>
  </div>
  <slot></slot>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SidePanel',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  emits: ['close'],
});
</script>
