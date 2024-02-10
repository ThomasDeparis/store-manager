<template>
  <q-page class="row items-center justify-evenly">
    <product-grid
      @new-product-click="rightDrawerOpen = !rightDrawerOpen"
    ></product-grid>
  </q-page>
  <q-drawer v-model="rightDrawerOpen" side="right" show-if-above bordered>
    <product-creation
      @productCreated="handleNewProduct"
      @productCreationFailed="handleNewProductFail"
    ></product-creation>
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import ProductGrid from '../components/ProductGrid.vue';

import ProductCreation from 'components/ProductCreation.vue';

import { handleProductError } from '../utils/product-error-handler';
import useNotifyHandler from '../hooks/notify-handler';
import { IProductError } from '../models/producterror';

export default defineComponent({
  name: 'ProductsPage',
  components: { ProductGrid, ProductCreation },
  setup() {
    const { t } = useI18n();
    const notifier = useNotifyHandler();

    const rightDrawerOpen = ref(false);

    const handleNewProductFail = (error: IProductError) =>
      notifier.NotifyError(handleProductError(error));

    const handleNewProduct = () => {
      notifier.NotifySuccess(t('product.created'));
      rightDrawerOpen.value = false;
    };

    return {
      rightDrawerOpen,
      handleNewProductFail,
      handleNewProduct,
    };
  },
});
</script>
