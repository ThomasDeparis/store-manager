<template>
  <side-panel
    :title="`Détail de la commande : ${order.reference}`"
    @close="$emit('close')"
  >
    <div>
      <p class="q-my-md q-mx-sm">
        {{ $t('order.customer') }} : {{ recipientName }}
      </p>
      <p class="q-ma-sm">
        {{ $t('order.orderDate') }} : {{ order.orderDate.toLocaleDateString() }}
      </p>
    </div>
    <div class="q-my-md">
      <span class="row q-mx-sm"
        >{{ $t('order.totalAmount') }} : {{ totalAmount }} €</span
      >
      <span class="row q-mx-sm text-caption">{{
        $t('order.cartContent')
      }}</span>
      <q-list bordered padding>
        <div v-for="(p, index) in order.products" v-bind:key="p.productId">
          <q-item>
            <q-item-section>
              <q-item-label overline>{{ p.productReference }}</q-item-label>
              <q-item-label class="q-mb-sm">{{ p.productName }}</q-item-label>
              <q-item-label class="row">
                {{ $t('order.shortQty') }} : {{ p.orderedQty }}
              </q-item-label>
              <q-item-label class="row">
                {{ $t('order.price') }} : {{ p.unitPrice }} €
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
import { ISale, IOrderRow } from 'models/order/order';
import { PropType, defineComponent, computed } from 'vue';

import SidePanel from 'components/common/SidePanel.vue';
import { useCustomerStore } from 'stores/customer-store';

export default defineComponent({
  name: 'SaleDetail',
  components: { SidePanel },
  emits: ['close'],
  props: {
    modelValue: {
      type: Object as PropType<ISale>,
      required: true,
    },
  },
  setup(props) {
    const order = computed(() => props.modelValue);
    const customerStore = useCustomerStore();

    const recipientName = computed(() => {
      return customerStore.customers.find(
        (p) => p.id === order.value.customerId
      )?.name;
    });

    const totalAmount = computed(() => {
      return order.value?.products?.reduce(
        (total: number, p: IOrderRow) =>
          total + p.unitPrice * (p?.orderedQty || 0),
        0
      );
    });

    return {
      order,
      recipientName,
      totalAmount,
    };
  },
});
</script>
