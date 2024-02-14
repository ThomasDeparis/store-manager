<template>
  <q-page>
    <product-grid
      @new-product-click="newProductPanelOpen = true"
    ></product-grid>
  </q-page>

  <q-drawer v-model="newProductPanelOpen" side="right" bordered>
    <product-creation
      @productCreated="handleNewProduct"
      @productCreationFailed="handleNewProductFail"
      @close="newProductPanelOpen = false"
    ></product-creation>
  </q-drawer>

  <q-drawer v-model="editProductPanelOpen" side="right" bordered>
    <product-edit @close="editProductPanelOpen = false"></product-edit>
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import ProductGrid from 'components/product/ProductGrid.vue';

import ProductCreation from 'components/product/ProductCreation.vue';

import { handleProductError } from 'utils/product-error-handler';
import useNotifyHandler from 'hooks/notify-handler';
import { IProductError } from 'src/models/producterror';

export default defineComponent({
  name: 'ProductsPage',
  components: { ProductGrid, ProductCreation },
  setup() {
    const { t } = useI18n();
    const notifier = useNotifyHandler();
    const newProductPanelOpen = ref(false);
    const editProductPanelOpen = ref(false);

    const handleNewProductFail = (error: IProductError) =>
      notifier.NotifyError(handleProductError(error));

    const handleNewProduct = () => {
      notifier.NotifySuccess(t('product.created'));
    };

    return {
      newProductPanelOpen,
      editProductPanelOpen,
      handleNewProductFail,
      handleNewProduct,
    };
  },
});
</script>
