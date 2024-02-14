<template>
  <router-link custom :to="{ name: routeName }" v-slot="{ href }">
    <q-item clickable :href="href">
      <q-item-section v-if="icon" avatar>
        <q-icon :name="icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ title }}</q-item-label>
        <q-item-label caption>{{ caption }}</q-item-label>
      </q-item-section>
    </q-item>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true,
    },

    caption: {
      type: String,
      default: '',
    },

    routeName: {
      type: String,
      required: true,
    },

    icon: {
      type: String,
      default: '',
    },
  },
});
</script>
