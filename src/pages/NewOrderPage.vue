<template>
  <q-page padding>
    <h4>{{ $t('order.newOrder') }}</h4>
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
              v-model="selectedProvider"
              :options="providersList"
              :label="$t('order.provider')"
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
          {{ cartContent?.length || 0 }} {{ $t('order.addedProducts') }}
          <order-cart v-model="cartContent"></order-cart>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, ref, Ref, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

import ProductSelectionGrid from 'src/components/product/ProductSelectionGrid.vue';
import OrderCart from 'src/components/order/OrderCart.vue';

import { IProvider } from 'models/provider/provider';
import { useProviderStore } from 'src/stores/provider-store';
import { IProduct } from 'src/models/product/product';
import { IOrder, IOrderRow } from 'src/models/order/order';
import { useUserStore } from 'src/stores/user-store';
import { useOrderStore } from 'src/stores/order-store';

import useNotifyHandler from 'src/hooks/notify-handler';
import moment from 'moment';
import { t } from 'src/i18n';
import { handleOrderError } from 'src/utils/order-error-handler';

export default defineComponent({
  name: 'NewOrderPage',
  components: { ProductSelectionGrid, OrderCart },
  props: {
    providerId: {
      type: String,
      required: false,
    },
  },

  setup(props) {
    const userStore = useUserStore();
    const providerStore = useProviderStore();
    const orderStore = useOrderStore();
    const notifier = useNotifyHandler();
    const router = useRouter();

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
          orderDate: moment(orderDate.value, 'DD/MM/YYYY').toDate(),
          products: cartContent.value,
          storeId: userStore.currentStore,
        } as IOrder;

        await orderStore.addOrder(order);
        notifier.NotifySuccess(t('order.created'));
        router.push({ name: 'orders' });
      } catch (error: any) {
        notifier.NotifyError(handleOrderError(error));
      }
    };

    return {
      orderForm,
      selectedProvider,
      reference,
      orderDate,
      orderDateRange,
      providersList: computed(() => providerStore.providers),
      onSubmit,
      selectedProducts,
      cartContent,
    };
  },
});
</script>
