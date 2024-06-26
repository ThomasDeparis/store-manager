<template>
  <q-page padding>
    <h4>{{ $t('order.newOrder') }}</h4>
    <order-creation
      :recipient-id="providerId"
      :recipients-list="providersList"
      @submit:order="(order) => onSubmit(order)"
    ></order-creation>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

import { useProviderStore } from 'stores/provider-store';
import { IProviderOrder, IGenericOrder } from 'models/order/order';
import { useUserStore } from 'stores/user-store';
import { useOrderStore } from 'stores/order-store';

import useNotifyHandler from 'hooks/notify-handler';
import { t } from 'src/i18n';
import { handleOrderError } from 'utils/order-error-handler';
import { IOrderError } from 'models/order/ordererror';

import OrderCreation from 'components/order/OrderCreation.vue';

export default defineComponent({
  name: 'NewOrderPage',
  components: { OrderCreation },
  props: {
    providerId: {
      type: String,
      required: false,
    },
  },

  setup() {
    const userStore = useUserStore();
    const providerStore = useProviderStore();
    const orderStore = useOrderStore();
    const notifier = useNotifyHandler();
    const router = useRouter();

    if (userStore.currentStore) {
      providerStore.loadProviders(userStore.currentStore);
    }

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

    const onSubmit = async (order: IGenericOrder) => {
      try {
        const { recipientId, ...otherAttrs } = order;

        await orderStore.addProviderOrder({
          providerId: recipientId,
          ...otherAttrs,
        } as IProviderOrder);

        notifier.NotifySuccess(t('order.created'));
        router.push({ name: 'orders' });
      } catch (error: IOrderError | any) {
        notifier.NotifyError(handleOrderError(error));
      }
    };

    return {
      providersList: computed(() => providerStore.providers),
      onSubmit,
    };
  },
});
</script>
