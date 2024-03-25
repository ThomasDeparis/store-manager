<template>
  <side-panel
    :title="`Réception de la commande : ${orderReference}`"
    @close="$emit('close')"
  >
    <q-list bordered padding>
      <q-form @submit="confirmOrder">
        <div class="row justify-center">
          <q-btn class="q-ma-sm" type="submit" color="primary"
            >Confirmer réception</q-btn
          >
          <q-btn class="q-ma-sm" color="green" @click="fillAllQties"
            >Réception complète</q-btn
          >
        </div>

        <div v-for="(p, index) in cartContent" v-bind:key="p.productId">
          <q-item>
            <q-item-section>
              <q-item-label overline>{{ p.productReference }}</q-item-label>
              <q-item-label>{{ p.productName }}</q-item-label>
              <q-item-label class="row" caption>
                <q-input
                  class="q-pa-sm col-8"
                  v-model.number="p.receivedQty"
                  inputmode="numeric"
                  :label="$t('order.receivedQty')"
                  :hint="`Quantité commandée : ${p.orderedQty}`"
                  dense
                  lazy-rules
                  :rules="[
                    (val) => val >= 0 || `Quantité commandée : ${p.orderedQty}`,
                  ]"
                />
                <div class="col q-pa-md">
                  <q-btn
                    class=""
                    @click="p.receivedQty = p.orderedQty"
                    round
                    push
                    size="sm"
                    icon="assignment_turned_in"
                    color="green"
                    ><q-tooltip>
                      <div class="text-body2">Quantité reçue conforme</div>
                    </q-tooltip>
                  </q-btn>
                </div>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator spaced v-if="index < (cartContent?.length || 0) - 1" />
        </div>
      </q-form>
    </q-list>
  </side-panel>
</template>

<script lang="ts">
import { IOrderRow } from 'models/order/order';
import { PropType, defineComponent, computed } from 'vue';

import SidePanel from 'components/common/SidePanel.vue';
import { useOrderStore } from 'stores/order-store';
import { IOrderError } from 'models/order/ordererror';

export default defineComponent({
  name: 'OrderConfirm',
  components: { SidePanel },
  emits: ['order-confirmed', 'order-confirm-error', 'close'],
  props: {
    orderReference: {
      type: String,
    },
    orderId: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Object as PropType<IOrderRow[]>,
      required: true,
    },
  },
  setup(props, context) {
    const cartContent = computed(() => props.modelValue);
    const orderStore = useOrderStore();

    const confirmOrder = async () => {
      try {
        await orderStore.validateReceipt(props.orderId, cartContent.value);
        context.emit('order-confirmed', cartContent.value);
      } catch (error: IOrderError | unknown) {
        context.emit('order-confirm-error', error);
      }
    };

    const fillAllQties = () => {
      cartContent?.value?.forEach((p) => {
        p.receivedQty = p.orderedQty;
      });
    };

    return {
      cartContent,
      confirmOrder,
      fillAllQties,
    };
  },
});
</script>
