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
          <q-btn-group> </q-btn-group>
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
  emits: ['new-provider-click', 'edit-row-click', 'detail-row-click'],

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
        label: 'Téléphone',
        field: 'phone',
      },
      {
        name: 'email',
        label: 'email',
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
