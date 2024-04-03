<template>
  <q-form ref="orderForm" @submit.prevent="onSubmit">
    <div class="row">
      <div class="col-8">
        <div class="row">
          <div class="col-4 q-ma-sm">
            <q-input
              filled
              v-model="reference"
              :label="$t('order.reference')"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || $t('forms.mandatory'),
              ]"
            />
          </div>
          <div class="col-4 q-ma-sm">
            <q-input
              filled
              mask="##/##/####"
              :hint="$t('common.dateFormat')"
              v-model="orderDate"
              :label="$t('order.orderDate')"
              :rules="[
                (val) => (val && val.length > 0) || $t('forms.mandatory'),
              ]"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date
                      v-model="orderDate"
                      mask="DD/MM/YYYY"
                      :options="orderDateRange"
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          :label="$t('buttons.close')"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
        <div class="col-4 q-ma-sm">
          <q-select
            filled
            v-model="selectedRecipient"
            :options="recipientsList"
            :label="$t('order.recipient')"
            :option-value="(p) => p?.id"
            :option-label="(p) => p?.name"
            lazy-rules
            :rules="[(val) => !!val || $t('forms.mandatory')]"
          />
        </div>
      </div>
      <div class="col-4 q-px-xl column justify-end">
        <q-btn
          type="submit"
          :disable="cartContent?.length === 0"
          class="col-3"
          color="primary"
        >
          {{ $t('buttons.order') }}</q-btn
        >
      </div>
    </div>
    <div class="row q-my-md">
      <div class="col-8 q-pa-sm">
        <product-selection-grid
          v-model="selectedProducts"
        ></product-selection-grid>
      </div>
      <div class="col-4 q-pa-sm">
        <p>{{ cartContent?.length || 0 }} {{ $t('order.addedProducts') }}</p>
        <p>{{ $t('order.totalAmount') }} : {{ totalAmount }} €</p>

        <order-cart v-model="cartContent"></order-cart>
      </div>
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent, computed, ref, Ref, watch, watchEffect } from 'vue';

import ProductSelectionGrid from 'components/product/ProductSelectionGrid.vue';
import OrderCart from 'components/order/OrderCart.vue';

import { IProvider } from 'models/provider/provider';
import { IProduct } from 'models/product/product';
import { IOrderRow, IRecipient, IGenericOrder } from 'models/order/order';
import { useUserStore } from 'stores/user-store';

import moment from 'moment';

export default defineComponent({
  name: 'OrderCreation',
  components: { ProductSelectionGrid, OrderCart },
  emits: ['submit:order'],
  props: {
    recipientId: {
      type: String,
      required: false,
    },
    recipientsList: {
      type: Array<IRecipient>,
      required: true,
    },
    autoSellPrice: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const userStore = useUserStore();
    const availableRecipients = computed(() => props.recipientsList);

    const selectedRecipient: Ref<IRecipient> = ref(
      availableRecipients.value.find(
        (r: IRecipient) => r.id === props.recipientId
      ) as IRecipient
    );

    watchEffect(() => {
      selectedRecipient.value = availableRecipients.value.find(
        (p) => p.id === props.recipientId
      ) as IProvider;
    });

    const reference = ref('');
    const orderDate = ref('');

    const orderDateRange = (date: string) => {
      return moment(date, 'YYYY/MM/DD') <= moment();
    };

    const selectedProducts: Ref<IProduct[]> = ref([]);
    const cartContent: Ref<IOrderRow[]> = ref([]);
    const orderForm = ref(null);

    // auto sync selected products with cart
    watch(selectedProducts, (newSelection) => {
      let newCart = newSelection.map((newS) => {
        const existingCartRow = cartContent.value.find(
          (c) => c.productId === newS.id
        );

        return {
          productId: newS.id,
          productName: newS.name,
          productReference: newS.reference,
          orderedQty: existingCartRow?.orderedQty,
          unitPrice:
            existingCartRow?.unitPrice ||
            (props.autoSellPrice ? newS.sellPrice : null),
        } as IOrderRow;
      });

      cartContent.value = newCart;
    });

    const onSubmit = async () => {
      const order = {
        recipientId: selectedRecipient.value.id,
        reference: reference.value,
        orderDate: moment(orderDate.value, 'DD/MM/YYYY').toDate(),
        products: cartContent.value,
        storeId: userStore.currentStore,
      } as IGenericOrder;

      emit('submit:order', order);
    };

    const totalAmount = computed(() => {
      return cartContent.value
        .reduce(
          (total: number, p: IOrderRow) =>
            total + (p?.unitPrice || 0) * (p?.orderedQty || 0),
          0
        )
        ?.toFixed(2);
    });

    return {
      orderForm,
      selectedRecipient,
      reference,
      orderDate,
      orderDateRange,
      availableRecipients,
      selectedProducts,
      cartContent,
      onSubmit,
      totalAmount,
    };
  },
});
</script>
