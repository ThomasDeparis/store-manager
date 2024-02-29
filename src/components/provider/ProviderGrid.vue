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
          :label="$t('provider.newProvider')"
          @click="$emit('new-provider-click')"
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
            icon="shopping_cart"
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
    <q-btn icon="search" @click="loadProviders"></q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useProviderStore } from 'src/stores/provider-store';
import { useUserStore } from 'src/stores/user-store';
import { QTableProps } from 'quasar';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'ProviderGrid',
  emits: [
    'new-provider-click',
    'edit-row-click',
    'detail-row-click',
    'order-row-click',
  ],

  setup() {
    const { t } = useI18n();
    const providersStore = useProviderStore();
    const user = useUserStore();

    const columns = [
      {
        name: 'actions',
        label: '',
        align: 'center',
      },
      {
        name: 'name',
        label: t('provider.name'),
        field: 'name',
        sortable: true,
      },
      {
        name: 'phone',
        label: t('provider.phone'),
        field: 'phone',
      },
      {
        name: 'email',
        label: t('provider.email'),
        field: 'email',
        sortable: true,
      },
    ] as QTableProps['columns'];

    const loadProviders = () => {
      providersStore.loadProviders(user.currentStore);
    };

    const providersRows = computed(() => {
      return providersStore.providers.map(function (p) {
        return {
          ...p,
          actions: null, // to match with actions column
        };
      });
    });

    return {
      filter: ref(''),
      columns,
      rows: providersRows,
      loadProviders,
      loading: providersStore.isLoading,
    };
  },
});
</script>
