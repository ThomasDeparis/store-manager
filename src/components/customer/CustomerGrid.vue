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
          :label="$t('customer.newCustomer')"
          @click="$emit('new-customer-click')"
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
            class="q-mr-sm"
            icon="edit"
            push
            round
            color="amber-7"
            size="sm"
            @click="$emit('edit-row-click', props.row)"
          >
            <q-tooltip>
              <div class="text-body2">{{ $t('buttons.edit') }}</div>
            </q-tooltip>
          </q-btn>
          <q-btn
            icon="visibility"
            class="q-mr-sm"
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
          <q-btn
            icon="shopping_bag"
            class="q-mr-sm"
            push
            round
            color="green"
            size="sm"
            @click="$emit('order-row-click', props.row)"
          >
            <q-tooltip>
              <div class="text-body2">{{ $t('buttons.order') }}</div>
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import { useCustomerStore } from 'stores/customer-store';
import { useUserStore } from 'stores/user-store';
import { QTableProps } from 'quasar';
import { useI18n } from 'vue-i18n';
import { ICustomer } from 'models/customer/customer';

export default defineComponent({
  name: 'CustomerGrid',
  emits: [
    'new-customer-click',
    'edit-row-click',
    'detail-row-click',
    'order-row-click',
  ],

  setup() {
    const { t } = useI18n();
    const customersStore = useCustomerStore();
    const user = useUserStore();

    const columns = [
      {
        name: 'actions',
        label: '',
        align: 'center',
      },
      {
        name: 'name',
        label: t('customer.name'),
        field: 'name',
        sortable: true,
      },
      {
        name: 'address',
        label: t('customer.address'),
        field: 'address',
      },
      {
        name: 'country',
        label: t('customer.country'),
        field: 'country',
      },
      {
        name: 'email',
        label: t('customer.email'),
        field: 'email',
        sortable: true,
      },
      {
        name: 'phone',
        label: t('customer.phone'),
        field: 'phone',
        sortable: true,
      },
    ] as QTableProps['columns'];

    const loadCustomers = () => {
      customersStore.loadCustomers(user.currentStore);
    };

    //load customers list after user is loaded
    watch(
      () => user.currentStore,
      () => {
        loadCustomers();
      }
    );

    onMounted(() => {
      if (user.currentStore != null) loadCustomers();
    });

    const customersRows = computed(() => {
      return customersStore.customers.map(function (c: ICustomer) {
        console.log(c);
        return {
          ...c,
          actions: null, // to match with actions column
        };
      });
    });

    return {
      filter: ref(''),
      columns,
      rows: customersRows,
      loadCustomers,
      loading: computed(() => customersStore.isLoading),
    };
  },
});
</script>
