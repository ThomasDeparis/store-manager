<template>
  <q-page>
    <product-grid
      @new-product-click="openSidePanel('new', emptyRow)"
      @edit-row-click="(row) => openSidePanel('edit', row)"
      @detail-row-click="(row) => openSidePanel('detail', row)"
      @duplicate-row-click="(row) => duplicateProduct(row)"
    ></product-grid>
  </q-page>

  <q-drawer :model-value="sidePanel === 'new'" side="right" bordered>
    <product-creation
      v-model="editingRow"
      @update:model-value="handleNewProduct"
      @productCreationFailed="handleTechnicalError"
      @close="closeSidePanel"
    ></product-creation>
  </q-drawer>

  <q-drawer
    :model-value="sidePanel === 'edit' || sidePanel === 'detail'"
    side="right"
    bordered
  >
    <product-edit
      v-model="editingRow"
      :readonly-mode="readonlyEditMode"
      @close="closeSidePanel"
      @update:model-value="handleProductEdited"
      @update:readonly-mode="handleEditModeChanged"
      @product-edit-failed="handleTechnicalError"
    />
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

import ProductGrid from 'components/product/ProductGrid.vue';

import ProductCreation from 'components/product/ProductCreation.vue';
import ProductEdit from 'components/product/ProductEdit.vue';

import { handleProductError } from 'utils/product-error-handler';
import useNotifyHandler from 'hooks/notify-handler';
import { IProductError } from 'src/models/product/producterror';
import { IProduct } from 'src/models/product/product';

export default defineComponent({
  name: 'ProductsPage',
  components: { ProductGrid, ProductCreation, ProductEdit },
  setup() {
    const { t } = useI18n();
    const notifier = useNotifyHandler();

    const emptyRow: IProduct = {
      id: '',
      name: '',
      quantity: 0,
      sellPrice: 0,
      reference: '',
      storeId: '',
      providerReference: '',
      lastChangeUserId: '',
    };

    const editingRow = ref<IProduct>(emptyRow);

    type PanelMode = 'new' | 'edit' | 'detail' | null;
    var sidePanel: Ref<PanelMode> = ref(null);

    const openSidePanel = (mode: PanelMode, row: IProduct) => {
      sidePanel.value = mode;
      let rowCopy = Object.create(row);
      editingRow.value = rowCopy;
    };
    const closeSidePanel = () => {
      sidePanel.value = null;
      editingRow.value = emptyRow;
    };

    const duplicateProduct = (original: IProduct) => {
      let copy = Object.create(emptyRow) as IProduct;
      copy.reference = original.reference;
      copy.providerReference = original.providerReference;
      copy.name = original.name;
      copy.sellPrice = original.sellPrice;

      openSidePanel('new', copy);
    };

    const readonlyEditMode = computed(() => sidePanel.value === 'detail');
    const handleEditModeChanged = (newEditMode: boolean) => {
      sidePanel.value = newEditMode ? 'edit' : 'detail';
    };

    const handleTechnicalError = (error: IProductError) =>
      notifier.NotifyError(handleProductError(error));

    const handleNewProduct = () => {
      notifier.NotifySuccess(t('product.created'));
      closeSidePanel();
    };

    const handleProductEdited = () => {
      notifier.NotifySuccess(t('product.edited'));
      closeSidePanel();
    };

    return {
      handleTechnicalError,
      handleNewProduct,
      handleProductEdited,
      sidePanel,
      openSidePanel,
      closeSidePanel,
      emptyRow,
      editingRow,
      readonlyEditMode,
      handleEditModeChanged,
      duplicateProduct,
    };
  },
});
</script>
