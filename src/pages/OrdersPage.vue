<template>
  <q-page>
    <order-grid
      @new-order-click="gotoNewOrder"
      @confirm-row-click="(row) => openSidePanel('confirm', row)"
    ></order-grid>
  </q-page>

  <q-drawer :model-value="sidePanel === 'confirm'" side="right" bordered>
    <order-confirm
      :order-id="editingRow.id"
      v-model="editingRow.products"
      :order-reference="editingRow.reference"
      @order-confirmed="handleOrderConfirmed"
      @close="closeSidePanel"
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

import { useOrderStore } from 'src/stores/order-store';
import { IOrderError } from 'src/models/order/ordererror';

export default defineComponent({
  name: 'OrdersPage',
  components: { OrderGrid, OrderConfirm },
  emits: [...useDialogPluginComponent.emits],

  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const dialogOpened = ref(false);
    const orderStore = useOrderStore();
    const notifier = useNotifyHandler();

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
      products: [],
    };

    const editingRow = ref<IOrder>(emptyRow);

    type PanelMode = 'confirm' | null;
    var sidePanel: Ref<PanelMode> = ref(null);

    const openSidePanel = (mode: PanelMode, row: IOrder) => {
      try {
        if (row?.products?.length === 0) {
          orderStore.loadOrderProducts(row.id);
        }

        sidePanel.value = mode;
        const reloadedOrder = orderStore.orders.find((o) => o.id === row.id);

        if (!reloadedOrder) {
          notifier.NotifyError(t('common.technicalError'));
        } else {
          let rowCopy = Object.create(reloadedOrder);
          editingRow.value = rowCopy;
        }
      } catch (error: IOrderError | unknown) {
        notifier.NotifyError(t('common.technicalError'));
      }
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
