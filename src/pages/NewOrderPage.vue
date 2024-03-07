<template>
  <q-page padding>
    <h4>Nouvelle commande fournisseur</h4>
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
                hint="Format jj/mm/aaaa"
                v-model="orderDate"
                label="Date de la commande"
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
                      <q-date v-model="orderDate" mask="DD/MM/YYYY">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
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
              v-model="selectedProvider"
              :options="providersList"
              label="order.providers"
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
            Commander</q-btn
          >
        </div>
      </div>
      <div class="row q-my-md">
        <div class="col-8 q-pa-sm">
          <order-grid v-model="selectedProducts"></order-grid>
        </div>
        <div class="col-4 q-pa-sm">
          <order-cart v-model="cartContent"></order-cart>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, ref, Ref, watch, watchEffect } from 'vue';

import OrderGrid from 'components/provider/OrderGrid.vue';
import OrderCart from 'components/provider/OrderCart.vue';

import { IProvider } from 'models/provider/provider';
import { useProviderStore } from 'src/stores/provider-store';
import { IProduct } from 'src/models/product/product';
import { IOrder, IOrderRow } from 'src/models/order/order';
import { useUserStore } from 'src/stores/user-store';
import moment from 'moment';
import { useOrderStore } from 'src/stores/order-store';

export default defineComponent({
  name: 'NewOrderPage',
  components: { OrderGrid, OrderCart },
  props: {
    providerId: {
      type: String,
      required: false,
    },
  },

  setup(props, context) {
    const userStore = useUserStore();
    const providerStore = useProviderStore();
    const orderStore = useOrderStore();

    //load providers list after user is loaded
    watch(
      () => userStore.currentStore,
      () => {
        if (
          providerStore.providers == null ||
          providerStore.providers?.length === 0
        ) {
          providerStore.loadProviders(userStore.currentStore);
        }
      }
    );

    const selectedProvider: Ref<IProvider> = ref(
      providerStore.providers.find(
        (p) => p.id === props.providerId
      ) as IProvider
    );

    watchEffect(() => {
      selectedProvider.value = providerStore.providers.find(
        (p) => p.id === props.providerId
      ) as IProvider;
    });

    const reference = ref('');
    const orderDate = ref('');
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
          unitPrice: existingCartRow?.unitPrice,
        } as IOrderRow;
      });

      cartContent.value = newCart;
    });

    const onSubmit = async () => {
      try {
        const order = {
          providerId: selectedProvider.value.id,
          reference: reference.value,
          orderDate: moment(orderDate.value).unix(),
          products: cartContent.value,
          storeId: userStore.currentStore,
        } as IOrder;

        const createResult = await orderStore.addOrder(order);
        context.emit('provider-created', createResult);
      } catch (error) {
        console.log(error);
        context.emit('provider-creation-failed', error);
      }
    };

    return {
      orderForm,
      selectedProvider,
      reference,
      orderDate,
      providersList: computed(() => providerStore.providers),
      onSubmit,
      selectedProducts,
      cartContent,
    };
  },
});
</script>
