<template>
  <q-page>
    <provider-grid
      @new-provider-click="openSidePanel('new', emptyRow)"
      @edit-row-click="(row) => openSidePanel('edit', row)"
      @detail-row-click="(row) => openSidePanel('detail', row)"
      @order-row-click="(row) => openNewOrder(row)"
    ></provider-grid>
  </q-page>

  <q-drawer :model-value="sidePanel === 'new'" side="right" bordered>
    <provider-creation
      @providerCreated="handleNewProvider"
      @providerCreationFailed="handleTechnicalError"
      @close="closeSidePanel"
    ></provider-creation>
  </q-drawer>

  <q-drawer
    :model-value="sidePanel === 'edit' || sidePanel === 'detail'"
    side="right"
    bordered
  >
    <provider-edit
      v-model="editingRow"
      :readonly-mode="readonlyEditMode"
      @close="closeSidePanel"
      @update:model-value="handleProviderEdited"
      @update:readonly-mode="handleEditModeChanged"
      @provider-edit-failed="handleTechnicalError"
    />
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import ProviderGrid from 'components/provider/ProviderGrid.vue';

import ProviderCreation from 'components/provider/ProviderCreation.vue';
import ProviderEdit from 'components/provider/ProviderEdit.vue';

import { handleProviderError } from 'utils/provider-error-handler';
import useNotifyHandler from 'hooks/notify-handler';
import { IProviderError } from 'src/models/provider/providererror';
import { IProvider } from 'src/models/provider/provider';

import { useDialogPluginComponent } from 'quasar';

export default defineComponent({
  name: 'ProvidersPage',
  components: { ProviderGrid, ProviderCreation, ProviderEdit },
  emits: [...useDialogPluginComponent.emits],
  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const notifier = useNotifyHandler();
    const dialogOpened = ref(false);
    const selectedProvider = ref();

    const emptyRow: IProvider = {
      id: '',
      name: '',
      storeId: '',
      lastChangeUserId: '',
      email: '',
      phone: '',
    };

    const editingRow = ref<IProvider>(emptyRow);

    type PanelMode = 'new' | 'edit' | 'detail' | null;
    var sidePanel: Ref<PanelMode> = ref(null);

    const openSidePanel = (mode: PanelMode, row: IProvider) => {
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
      console.log('nouveau mode');
      console.log(newEditMode);
      sidePanel.value = newEditMode ? 'edit' : 'detail';
    };

    const handleTechnicalError = (error: IProviderError) =>
      notifier.NotifyError(handleProviderError(error));

    const handleNewProvider = () => {
      notifier.NotifySuccess(t('provider.created'));
    };

    const handleProviderEdited = () => {
      notifier.NotifySuccess(t('provider.edited'));
      closeSidePanel();
    };

    const openNewOrder = (selectedProvider: IProvider) => {
      router.push({
        name: 'provider-neworder',
        params: { providerId: selectedProvider.id },
      });
    };

    return {
      handleTechnicalError,
      handleNewProvider,
      handleProviderEdited,
      sidePanel,
      openSidePanel,
      closeSidePanel,
      emptyRow,
      editingRow,
      readonlyEditMode,
      handleEditModeChanged,
      dialogOpened,
      selectedProvider,
      openNewOrder,
    };
  },
});
</script>
