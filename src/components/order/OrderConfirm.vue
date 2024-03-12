<template>
  <q-list bordered padding>
    <q-item-label header
      >{{ orderReference }} : réception de la commande
    </q-item-label>
    <q-form @submit="confirmOrder">
      <q-btn type="submit">Confirmer réception</q-btn>

      <div v-for="(p, index) in cartContent" v-bind:key="p.productId">
        <q-item>
          <q-item-section>
            <q-item-label overline>{{ p.productReference }}</q-item-label>
            <q-item-label>{{ p.productName }}</q-item-label>
            <q-item-label class="row" caption>
              <p>Quantité commandée : {{ p.orderedQty }}</p>
              <q-input
                class="col-6 q-pa-sm"
                v-model="p.receivedQty"
                type="number"
                :label="$t('order.quantity')"
                dense
                lazy-rules
                :rules="[
                  (val) => (val && val > 0) || $t('order.enterValidQuantity'),
                ]"
              />
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator spaced v-if="index < (cartContent?.length || 0) - 1" />
      </div>
    </q-form>
  </q-list>
</template>

<script lang="ts">
import { emit } from 'process';
import { IOrderRow } from 'src/models/order/order';
import { PropType, defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'OrderConfirm',
  emits: ['order-confirmed'],
  props: {
    orderReference: {
      type: String,
    },
    modelValue: {
      type: Object as PropType<IOrderRow[]>,
    },
  },
  setup(props, context) {
    const confirmOrder = () => {
      console.log('commande validée');
      context.emit('order-confirmed', props.modelValue);
    };

    return {
      cartContent: computed(() => props.modelValue),
      confirmOrder,
    };
  },
});
</script>
