<template>
  <div class="q-pa-md">
    <q-table
      class="body--light"
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
          :label="$t('product.newProduct')"
          @click="$emit('new-product-click')"
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
              <div class="text-body2">Éditer</div>
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
              <div class="text-body2">Détail</div>
            </q-tooltip>
          </q-btn>
          <q-btn icon="copy_all" round push color="grey" size="sm">
            <q-tooltip>
              <div class="text-body2">Dupliquer</div>
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
    <q-btn icon="search" @click="loadProducts"></q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useProductStore } from 'src/stores/product-store';
import { useUserStore } from 'src/stores/user-store';
import { QTableProps } from 'quasar';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'ProductGrid',
  emits: ['new-product-click', 'edit-row-click', 'detail-row-click'],

  setup() {
    const { t } = useI18n();
    const productsStore = useProductStore();
    const user = useUserStore();

    const columns = [
      {
        name: 'actions',
        label: '',
        align: 'center',
      },
      {
        name: 'reference',
        label: t('product.reference'),
        field: 'reference',
        sortable: true,
      },
      {
        name: 'providerreference',
        label: t('product.providerRef'),
        field: 'providerReference',
        sortable: true,
      },

      { name: 'name', label: t('product.name'), field: 'name', sortable: true },
      {
        name: 'quantity',
        label: t('product.quantity'),
        field: 'quantity',
        sortable: true,
      },
      {
        name: 'sellprice',
        label: t('product.sellPrice'),
        field: 'sellPrice',
        format: (val) => `${val} €`,
      },
    ] as QTableProps['columns'];

    const loadProducts = () => {
      productsStore.loadProducts(user.currentStore);
    };

    const productsRows = computed(() => {
      return productsStore.products.map(function (p) {
        return {
          ...p,
          actions: null, // to match with actions column
        };
      });
    });

    return {
      filter: ref(''),
      columns,
      rows: productsRows,
      loadProducts,
      loading: productsStore.isLoading,
    };
  },
});
</script>
