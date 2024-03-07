<template>
  <div>
    <q-table
      class="body--light"
      grid-header
      bordered
      :rows="rows"
      :columns="columns"
      row-key="reference"
      :filter="filter"
      :rows-per-page-options="[10, 20]"
      selection="multiple"
      v-model:selected="selected"
      @update:selected="(selected) => $emit('update:modelValue', selected)"
    >
      <template v-slot:top>
        <q-input dense debounce="300" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <!-- définition des boutons dans la colonne 'actions' -->
      <template v-slot:body-cell-actions="props">
        <q-td :props="props"> </q-td>
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
  name: 'OrderGrid',
  emits: ['update:modelValue'],

  setup() {
    const { t } = useI18n();
    const productsStore = useProductStore();
    const user = useUserStore();

    const selected = ref();

    const columns = [
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
      if (
        productsStore.products == null ||
        productsStore.products?.length === 0
      ) {
        productsStore.loadProducts(user.currentStore);
      }
    };

    watch(
      () => user.currentStore,
      () => {
        loadProducts();
      }
    );

    onMounted(() => {
      loadProducts();
    });

    return {
      filter: ref(''),
      columns,
      rows: computed(() => productsStore.products),
      loading: productsStore.isLoading,
      selected,
    };
  },
});
</script>
