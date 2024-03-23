<template>
  <side-panel
    :title="`Détail de la commande : ${order.reference}`"
    @close="$emit('close')"
  >
    <div>
      <p class="q-my-md q-mx-sm">
        {{ $t('order.provider') }} : {{ providerName }}
      </p>
      <p class="q-ma-sm">
        {{ $t('order.orderDate') }} : {{ order.orderDate.toLocaleDateString() }}
      </p>
      <p class="q-ma-sm">
        {{ $t('order.receiptDate') }} :
        {{ order.receiptDate?.toLocaleDateString() }}
      </p>
    </div>
    <div class="q-my-md">
      <span class="q-ma-sm text-caption">{{ $t('order.cartContent') }}</span>
      <q-list bordered padding>
        <div v-for="(p, index) in order.products" v-bind:key="p.productId">
          <q-item>
            <q-item-section>
              <q-item-label overline>{{ p.productReference }}</q-item-label>
              <q-item-label class="q-mb-sm">{{ p.productName }}</q-item-label>
              <q-item-label class="row">
                Qté reçue : {{ p.receivedQty }}
              </q-item-label>
              <q-item-label class="row" caption>
                Qté commandée : {{ p.orderedQty }}
              </q-item-label>
              <q-item-label class="row">
                Prix d'achat : {{ p.unitPrice }} €
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator
            spaced
            v-if="index < (order?.products?.length || 0) - 1"
          />
        </div>
      </q-list>
    </div>
  </side-panel>
</template>

<script lang="ts">
import { IOrder } from 'models/order/order';
import { PropType, defineComponent, computed } from 'vue';

import SidePanel from 'components/common/SidePanel.vue';
import { useProviderStore } from 'stores/provider-store';

export default defineComponent({
  name: 'OrderDetail',
  components: { SidePanel },
  emits: ['close'],
  props: {
    modelValue: {
      type: Object as PropType<IOrder>,
      required: true,
    },
  },
  setup(props) {
    const order = computed(() => props.modelValue);
    const providerStore = useProviderStore();

    const providerName = computed(() => {
      return providerStore.providers.find(
        (p) => p.id === order.value.providerId
      )?.name;
    });

    return {
      order,
      providerName,
    };
  },
});
</script>
