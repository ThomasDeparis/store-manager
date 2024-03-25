<template>
  <q-list bordered padding>
    <q-item-label header>{{ $t('order.cartContent') }}</q-item-label>
    <div v-for="(p, index) in cartContent" v-bind:key="p.productId">
      <q-item>
        <q-item-section>
          <q-item-label overline>{{ p.productReference }}</q-item-label>
          <q-item-label>{{ p.productName }}</q-item-label>
          <q-item-label class="row" caption>
            <q-input
              class="col-6 q-pa-sm"
              v-model.number="p.orderedQty"
              inputmode="numeric"
              :label="$t('order.quantity')"
              dense
              lazy-rules
              :rules="[(val) => val > 0 || $t('order.enterValidQuantity')]"
            /><q-input
              suffix="€"
              mask="#.##"
              fill-mask="0"
              reverse-fill-mask
              input-class="text-right"
              :rules="[(val) => val >= 0.0 || $t('order.enterValidBuyPrice')]"
              class="col-6 q-pa-sm"
              v-model="p.unitPrice"
              :label="$t('order.price')"
              dense
              lazy-rules
            />
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator spaced v-if="index < (cartContent?.length || 0) - 1" />
    </div>
  </q-list>
</template>

<script lang="ts">
import { IOrderRow } from 'src/models/order/order';
import { PropType, defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'OrderCart',
  props: {
    modelValue: {
      type: Object as PropType<IOrderRow[]>,
    },
  },
  setup(props) {
    return {
      cartContent: computed(() => props.modelValue),
    };
  },
});
</script>
