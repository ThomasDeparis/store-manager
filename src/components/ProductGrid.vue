<template>
  <div class="q-pa-md">
    <q-table
      class="table"
      grid-header
      bordered
      title="Produits"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="filter"
    >
      <template v-slot:top>
        <q-btn
          color="primary"
          :disable="loading"
          label="Nouveau produit"
          @click="addRow"
        />

        <q-space />
        <q-input
          borderless
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
    </q-table>
    <q-btn icon="search" @click="loadProducts"></q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useProductStore } from 'src/stores/product-store';
import { useUserStore } from 'src/stores/user-store';
import { QTableProps } from 'quasar';

export default defineComponent({
  name: 'ProductGrid',
  emits: ['newProductClick'],

  setup(_, context) {
    const products = useProductStore();
    const user = useUserStore();
    const columns = [
      { name: 'name', label: 'Nom', field: 'name', sortable: true },
      { name: 'quantity', label: 'Stock', field: 'quantity' },
    ];

    const loadProducts = () => {
      products.loadProducts(user.currentStore);
    };

    const productsList = computed(() => products.products);

    const addRow = () => {
      context.emit('newProductClick');
    };

    return {
      filter: ref(''),
      columns: columns as QTableProps['columns'],
      rows: productsList,
      loadProducts,
      loading: products.isLoading,
      addRow,
    };
  },
});
</script>
<style scoped>
.table {
  width: 650px;
}
</style>
