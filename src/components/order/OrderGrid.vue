<template>
  <div class="q-pa-md">
    <q-table
      grid-header
      bordered
      :rows="rows"
      :columns="columns"
      row-key="reference"
      :filter="filter"
      :rows-per-page-options="[50, 100]"
    >
      <template v-slot:top>
        <q-btn
          color="primary"
          :label="$t('order.newOrder')"
          @click="$emit('new-order-click')"
        />
        <q-space />
        <q-input dense debounce="300" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <!-- définition des boutons dans la colonne 'actions' -->
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            v-if="props.row.receiptDate === undefined"
            class="q-mr-sm"
            icon="check_circle"
            push
            round
            color="green"
            size="sm"
            @click="$emit('confirm-row-click', props.row)"
          >
            <q-tooltip>
              <div class="text-body2">{{ $t('order.confirm') }}</div>
            </q-tooltip>
          </q-btn>
          <q-btn
            v-if="props.row.receiptDate"
            data-testid="detailorderbtn"
            class="q-mr-sm"
            icon="visibility"
            push
            round
            color="primary"
            size="sm"
            @click="$emit('detail-row-click', props.row)"
          >
            <q-tooltip>
              <div class="text-body2">{{ $t('buttons.detail') }}</div>
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import { useOrderStore } from 'stores/order-store';
import { useProviderStore } from 'stores/provider-store';
import { useUserStore } from 'stores/user-store';
import { QTableProps } from 'quasar';
import { useI18n } from 'vue-i18n';
import moment from 'moment';

export default defineComponent({
  name: 'OrderGrid',
  emits: ['new-order-click', 'confirm-row-click', 'detail-row-click'],

  setup() {
    const { t } = useI18n();
    const ordersStore = useOrderStore();
    const user = useUserStore();
    const providerStore = useProviderStore();

    const columns = [
      {
        name: 'actions',
        label: '',
        align: 'center',
      },
      {
        name: 'reference',
        label: t('order.reference'),
        field: 'reference',
        sortable: true,
      },
      {
        name: 'provider',
        label: t('order.provider'),
        field: 'providerName',
      },
      {
        name: 'orderDate',
        label: t('order.orderDate'),
        field: 'orderDate',
        sortable: true,
        format: (val: Date) => moment(val).format('DD/MM/YYYY'),
      },
      {
        name: 'receiptDate',
        label: t('order.receiptDate'),
        field: 'receiptDate',
        sortable: true,
        format: (val: Date) =>
          val ? moment(val).format('DD/MM/YYYY HH:mm') : '',
      },
    ] as QTableProps['columns'];

    const loadStores = () => {
      if (
        ordersStore.orders == null ||
        ordersStore.orders?.length === 0 ||
        ordersStore.storeId !== user.currentStore
      ) {
        ordersStore.loadOrders(user.currentStore);
      }

      if (
        providerStore.providers == null ||
        providerStore.providers?.length === 0 ||
        providerStore.storeId !== user.currentStore
      ) {
        providerStore.loadProviders(user.currentStore);
      }
    };

    const providers = computed(() => {
      return providerStore.providers;
    });

    const ordersRows = computed(() => {
      return ordersStore.orders.map(function (o) {
        return {
          ...o,
          providerName: providers.value.find((p) => p.id === o.providerId)
            ?.name,
          actions: null, // to match with actions column
        };
      });
    });

    //load orders list after user is loaded
    watch(
      () => user.currentStore,
      () => {
        loadStores();
      }
    );

    onMounted(() => {
      if (user.currentStore != null) loadStores();
    });

    return {
      filter: ref(''),
      columns,
      rows: ordersRows,
      loadOrders: loadStores,
      loading: computed(() => ordersStore.isLoading),
    };
  },
});
</script>
