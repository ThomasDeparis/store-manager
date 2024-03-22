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
              <div class="text-body2">Finaliser la commande</div>
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import { useOrderStore } from 'src/stores/order-store';
import { useUserStore } from 'src/stores/user-store';
import { QTableProps } from 'quasar';
import { useI18n } from 'vue-i18n';
import moment from 'moment';

export default defineComponent({
  name: 'OrderGrid',
  emits: ['new-order-click', 'confirm-row-click'],

  setup() {
    const { t } = useI18n();
    const ordersStore = useOrderStore();
    const user = useUserStore();

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
        label: t('provider.name'),
        field: 'providerId',
      },
      {
        name: 'orderDate',
        label: t('order.orderDate'),
        field: 'orderDate',
        sortable: true,
        format: (val: Date) => moment(val).format('DD/MM/YYYY HH:mm'),
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

    const loadOrders = () => {
      if (
        ordersStore.orders == null ||
        ordersStore.orders?.length === 0 ||
        ordersStore.storeId !== user.currentStore
      ) {
        ordersStore.loadOrders(user.currentStore);
      }
    };

    const ordersRows = computed(() => {
      return ordersStore.orders.map(function (o) {
        return {
          ...o,
          actions: null, // to match with actions column
        };
      });
    });

    //load orders list after user is loaded
    watch(
      () => user.currentStore,
      () => {
        loadOrders();
      }
    );

    onMounted(() => {
      if (user.currentStore != null) loadOrders();
    });

    return {
      filter: ref(''),
      columns,
      rows: ordersRows,
      loadOrders,
      loading: computed(() => ordersStore.isLoading),
    };
  },
});
</script>
