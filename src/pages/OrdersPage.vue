<template>
  <q-page>
    <order-grid
      @new-order-click="gotoNewOrder"
      @confirm-row-click="(row) => openSidePanel('confirm', row)"
      @detail-row-click="(row) => openSidePanel('detail', row)"
    ></order-grid>
  </q-page>

  <q-drawer :model-value="sidePanel === 'confirm'" side="right" bordered>
    <order-confirm
      :order-id="editingRow.id"
      v-model="editingRow.products"
      :order-reference="editingRow.reference"
      @order-confirmed="handleOrderConfirmed"
      @order-confirm-error="handleError"
      @close="closeSidePanel"
    ></order-confirm>
  </q-drawer>
  <q-drawer :model-value="sidePanel === 'detail'" side="right" bordered>
    <order-detail v-model="editingRow" @close="closeSidePanel"></order-detail>
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import OrderGrid from 'components/order/OrderGrid.vue';
import OrderConfirm from 'components/order/OrderConfirm.vue';
import OrderDetail from 'components/order/OrderDetail.vue';

import useNotifyHandler from 'hooks/notify-handler';
import { useDialogPluginComponent } from 'quasar';
import { IOrder } from 'models/order/order';

import { useOrderStore } from 'stores/order-store';
import { IOrderError } from 'models/order/ordererror';
import { handleOrderError } from 'utils/order-error-handler';

export default defineComponent({
  name: 'OrdersPage',
  components: { OrderGrid, OrderConfirm, OrderDetail },
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

    type PanelMode = 'confirm' | 'detail' | null;
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
      closeSidePanel();
      notifier.NotifySuccess(t('order.received'));
    };

    const handleError = (error: IOrderError) => {
      notifier.NotifyError(handleOrderError(error));
    };

    return {
      dialogOpened,
      editingRow,
      gotoNewOrder,
      sidePanel,
      openSidePanel,
      closeSidePanel,
      handleOrderConfirmed,
      handleError,
    };
  },
});
</script>
