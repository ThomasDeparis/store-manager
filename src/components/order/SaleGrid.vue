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
          :label="$t('order.newSale')"
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
import { useCustomerStore } from 'stores/customer-store';
import { useUserStore } from 'stores/user-store';
import { QTableProps } from 'quasar';
import { useI18n } from 'vue-i18n';
import moment from 'moment';

export default defineComponent({
  name: 'SaleGrid',
  emits: ['new-order-click', 'detail-row-click'],

  setup() {
    const { t } = useI18n();
    const ordersStore = useOrderStore();
    const user = useUserStore();
    const customerStore = useCustomerStore();

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
        name: 'Customer',
        label: t('order.customer'),
        field: 'customerName',
      },
      {
        name: 'orderDate',
        label: t('order.orderDate'),
        field: 'orderDate',
        sortable: true,
        format: (val: Date) => moment(val).format('DD/MM/YYYY'),
      },
    ] as QTableProps['columns'];

    const loadStores = () => {
      if (
        ordersStore.customerOrders == null ||
        ordersStore.customerOrders?.length === 0 ||
        ordersStore.storeId !== user.currentStore
      ) {
        ordersStore.loadCustomerOrders(user.currentStore);
      }

      if (
        customerStore.customers == null ||
        customerStore.customers?.length === 0 ||
        customerStore.storeId !== user.currentStore
      ) {
        customerStore.loadCustomers(user.currentStore);
      }
    };

    const customers = computed(() => {
      return customerStore.customers;
    });

    const ordersRows = computed(() => {
      return ordersStore.customerOrders.map(function (o) {
        return {
          ...o,
          customerName: customers.value.find((p) => p.id === o.customerId)
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
      loading: computed(() => ordersStore.isLoading),
    };
  },
});
</script>
