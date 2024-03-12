<template>
  <q-page>
    <order-grid
      @new-order-click="gotoNewOrder"
      @confirm-row-click="(row) => openSidePanel('confirm', row)"
    ></order-grid>
  </q-page>

  <q-drawer :model-value="sidePanel === 'confirm'" side="right" bordered>
    <order-confirm
      v-model="editingRow.products"
      :order-reference="editingRow.reference"
      @order-confirmed="handleOrderConfirmed"
    ></order-confirm>
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import OrderGrid from 'components/order/OrderGrid.vue';
import OrderConfirm from 'components/order/OrderConfirm.vue';

import useNotifyHandler from 'hooks/notify-handler';
import { useDialogPluginComponent } from 'quasar';
import { IOrder } from 'src/models/order/order';

export default defineComponent({
  name: 'OrdersPage',
  components: { OrderGrid, OrderConfirm },
  emits: [...useDialogPluginComponent.emits],

  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const dialogOpened = ref(false);

    const gotoNewOrder = () => {
      router.push({
        name: 'neworder',
      });
    };

    const emptyRow: IOrder = {
      id: '',
      providerId: '',
      reference: '',
      orderDate: new Date(),
      storeId: '',
    };

    const editingRow = ref<IOrder>(emptyRow);

    type PanelMode = 'confirm' | null;
    var sidePanel: Ref<PanelMode> = ref(null);

    const openSidePanel = (mode: PanelMode, row: IOrder) => {
      sidePanel.value = mode;

      if (!!row?.products) {
        //TODO : charger les produits de la commande
      }

      let rowCopy = Object.create(row);
      editingRow.value = rowCopy;
    };
    const closeSidePanel = () => {
      sidePanel.value = null;
      editingRow.value = emptyRow;
    };

    const handleOrderConfirmed = () => {
      console.log('order confirmed handled');
    };

    return {
      dialogOpened,
      editingRow,
      gotoNewOrder,
      sidePanel,
      openSidePanel,
      closeSidePanel,
      handleOrderConfirmed,
    };
  },
});
</script>
