<template>
  <q-page padding>
    <h4>{{ $t('order.newSale') }}</h4>
    <order-creation
      :recipient-id="customerId"
      :recipients-list="customersList"
      @submit:order="(order) => onSubmit(order)"
      :auto-sell-price="true"
    ></order-creation>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

import { useCustomerStore } from 'stores/customer-store';
import { IGenericOrder, ICustomerOrder } from 'models/order/order';
import { useUserStore } from 'stores/user-store';
import { useOrderStore } from 'stores/order-store';

import useNotifyHandler from 'hooks/notify-handler';
import { t } from 'src/i18n';
import { handleOrderError } from 'utils/order-error-handler';
import { IOrderError } from 'models/order/ordererror';

import OrderCreation from 'components/order/OrderCreation.vue';

export default defineComponent({
  name: 'NewSalePage',
  components: { OrderCreation },
  props: {
    customerId: {
      type: String,
      required: false,
    },
  },

  setup() {
    const userStore = useUserStore();
    const customerStore = useCustomerStore();
    const orderStore = useOrderStore();
    const notifier = useNotifyHandler();
    const router = useRouter();

    if (userStore.currentStore) {
      customerStore.loadCustomers(userStore.currentStore);
    }

    //load providers list after user is loaded
    watch(
      () => userStore.currentStore,
      () => {
        if (
          customerStore.customers == null ||
          customerStore.customers?.length === 0
        ) {
          customerStore.loadCustomers(userStore.currentStore);
        }
      }
    );

    const onSubmit = async (order: IGenericOrder) => {
      try {
        const { recipientId, ...otherAttrs } = order;

        await orderStore.addCustomerOrder({
          customerId: recipientId,
          ...otherAttrs,
        } as ICustomerOrder);

        notifier.NotifySuccess(t('order.created'));
        router.push({ name: 'orders' });
      } catch (error: IOrderError | any) {
        notifier.NotifyError(handleOrderError(error));
      }
    };

    return {
      customersList: computed(() => customerStore.customers),
      onSubmit,
    };
  },
});
</script>
