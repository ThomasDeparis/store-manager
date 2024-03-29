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
          data-testid="newproductbtn"
          color="primary"
          :label="$t('product.newProduct')"
          @click="$emit('new-product-click')"
        />
        <q-space />
        <q-input
          data-testid="searchproductinput"
          dense
          debounce="300"
          color="primary"
          v-model="filter"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <!-- définition des boutons dans la colonne 'actions' -->
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            data-testid="editproductbtn"
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
            data-testid="detailproductbtn"
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
            data-testid="duplicateproductbtn"
            icon="copy_all"
            round
            push
            color="grey"
            size="sm"
            @click="$emit('duplicate-row-click', props.row)"
          >
            <q-tooltip>
              <div class="text-body2">{{ $t('buttons.duplicate') }}</div>
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from 'vue';
import { useProductStore } from 'src/stores/product-store';
import { useUserStore } from 'src/stores/user-store';
import { QTableProps } from 'quasar';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'ProductGrid',
  emits: [
    'new-product-click',
    'edit-row-click',
    'detail-row-click',
    'duplicate-row-click',
  ],

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

    //load products list after user is loaded
    watch(
      () => user.currentStore,
      () => {
        loadProducts();
      }
    );

    onMounted(() => {
      if (user.currentStore != null) loadProducts();
    });

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
