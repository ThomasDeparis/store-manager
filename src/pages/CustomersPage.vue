<template>
  <q-page>
    <customer-grid
      @new-customer-click="openSidePanel('new', emptyRow)"
      @edit-row-click="(row) => openSidePanel('edit', row)"
      @detail-row-click="(row) => openSidePanel('detail', row)"
      @order-row-click="(row) => openNewOrder(row)"
    ></customer-grid>
  </q-page>

  <q-drawer :model-value="sidePanel === 'new'" side="right" bordered>
    <customer-creation
      @customerCreated="handleNewCustomer"
      @customerCreationFailed="handleTechnicalError"
      @close="closeSidePanel"
    ></customer-creation>
  </q-drawer>

  <q-drawer
    :model-value="sidePanel === 'edit' || sidePanel === 'detail'"
    side="right"
    bordered
  >
    <customer-edit
      v-model="editingRow"
      :readonly-mode="readonlyEditMode"
      @close="closeSidePanel"
      @update:model-value="handleCustomerEdited"
      @update:readonly-mode="handleEditModeChanged"
      @customer-edit-failed="handleTechnicalError"
    />
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import CustomerGrid from 'components/customer/CustomerGrid.vue';

import CustomerCreation from 'components/customer/CustomerCreation.vue';
import CustomerEdit from 'components/customer/CustomerEdit.vue';

// import { handleCustomerError } from 'utils/customer-error-handler';
import useNotifyHandler from 'hooks/notify-handler';
import { ICustomerError } from 'models/customer/customererror';
import { ICustomer } from 'models/customer/customer';

import { useDialogPluginComponent } from 'quasar';

export default defineComponent({
  name: 'CustomersPage',
  components: { CustomerGrid, CustomerCreation, CustomerEdit },
  emits: [...useDialogPluginComponent.emits],
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const notifier = useNotifyHandler();
    const dialogOpened = ref(false);
    const selectedCustomer = ref();

    const emptyRow: ICustomer = {
      id: '',
      name: '',
      storeId: '',
      lastChangeUserId: '',
    };

    const editingRow = ref<ICustomer>(emptyRow);

    type PanelMode = 'new' | 'edit' | 'detail' | null;
    var sidePanel: Ref<PanelMode> = ref(null);

    const openSidePanel = (mode: PanelMode, row: ICustomer) => {
      sidePanel.value = mode;
      let rowCopy = Object.create(row);
      editingRow.value = rowCopy;
    };
    const closeSidePanel = () => {
      sidePanel.value = null;
      editingRow.value = emptyRow;
    };

    const readonlyEditMode = computed(() => sidePanel.value === 'detail');
    const handleEditModeChanged = (newEditMode: boolean) => {
      sidePanel.value = newEditMode ? 'edit' : 'detail';
    };

    const handleTechnicalError = (error: ICustomerError) => {
      notifier.NotifyError('error');
      console.log(error);
    };

    const handleNewCustomer = () => {
      notifier.NotifySuccess(t('customer.created'));
      closeSidePanel();
    };

    const handleCustomerEdited = () => {
      notifier.NotifySuccess(t('customer.edited'));
      closeSidePanel();
    };

    const openNewOrder = (selectedCustomer: ICustomer) => {
      router.push({
        name: 'customer-newsale',
        params: { customerId: selectedCustomer.id },
      });
    };

    return {
      handleTechnicalError,
      handleNewCustomer,
      handleCustomerEdited,
      sidePanel,
      openSidePanel,
      closeSidePanel,
      emptyRow,
      editingRow,
      readonlyEditMode,
      handleEditModeChanged,
      dialogOpened,
      selectedCustomer,
      openNewOrder,
    };
  },
});
</script>
