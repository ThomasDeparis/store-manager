<template>
  <q-page>
    <sale-grid
      @new-order-click="gotoNewOrder"
      @detail-row-click="(row) => openSidePanel('detail', row)"
    ></sale-grid>
  </q-page>

  <q-drawer :model-value="sidePanel === 'detail'" side="right" bordered>
    <sale-detail v-model="editingRow" @close="closeSidePanel"></sale-detail>
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import SaleGrid from 'components/order/SaleGrid.vue';
import SaleDetail from 'components/order/SaleDetail.vue';

import useNotifyHandler from 'hooks/notify-handler';
import { useDialogPluginComponent } from 'quasar';
import { IOrder, ISale } from 'models/order/order';

import { useOrderStore } from 'stores/order-store';
import { IOrderError } from 'models/order/ordererror';
import { handleOrderError } from 'utils/order-error-handler';

export default defineComponent({
  name: 'SalesPage',
  components: { SaleGrid, SaleDetail },
  emits: [...useDialogPluginComponent.emits],

  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const dialogOpened = ref(false);
    const orderStore = useOrderStore();
    const notifier = useNotifyHandler();

    const gotoNewOrder = () => {
      router.push({
        name: 'newsale',
      });
    };

    const emptyRow: ISale = {
      id: '',
      customerId: '',
      reference: '',
      orderDate: new Date(),
      storeId: '',
      products: [],
    };

    const editingRow = ref<ISale>(emptyRow);

    type PanelMode = 'detail' | null;
    var sidePanel: Ref<PanelMode> = ref(null);

    const openSidePanel = (mode: PanelMode, row: IOrder) => {
      try {
        if (row?.products?.length === 0) {
          orderStore.loadOrderProducts(row.id);
        }

        sidePanel.value = mode;
        const reloadedOrder = orderStore.customerOrders.find(
          (o) => o.id === row.id
        );

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
      handleError,
    };
  },
});
</script>
