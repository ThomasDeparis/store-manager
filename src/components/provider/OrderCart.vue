<template>
  <q-list bordered padding>
    <q-item-label header>Contenu de la commande</q-item-label>
    <div v-for="(p, index) in cartContent" v-bind:key="p.productId">
      <q-item>
        <q-item-section>
          <q-item-label overline>{{ p.productReference }}</q-item-label>
          <q-item-label>{{ p.productName }}</q-item-label>
          <q-item-label class="row" caption
            ><q-input
              suffix="€"
              mask="#.##"
              fill-mask="0"
              reverse-fill-mask
              input-class="text-right"
              :rules="[
                (val) =>
                  (val !== null && val !== '' && val > 0) ||
                  $t('product.enterValidSellPrice'),
              ]"
              class="col-6 q-pa-sm"
              v-model="p.unitPrice"
              label="Prix unitaire"
              dense
              lazy-rules />
            <q-input
              class="col-6 q-pa-sm"
              v-model="p.orderedQty"
              type="number"
              label="Quantité"
              dense
              lazy-rules
              :rules="[(val) => (val && val > 0) || $t('forms.mandatory')]"
          /></q-item-label>
        </q-item-section>

        <q-item-section side top class=""> </q-item-section>
        <q-item-section side top class=""> </q-item-section>
      </q-item>
      <q-separator spaced v-if="index < (cartContent?.length || 0) - 1" />
    </div>
  </q-list>
</template>

<script lang="ts">
import { IOrderRow } from 'src/models/order/order';
import { IProduct } from 'src/models/product/product';
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
