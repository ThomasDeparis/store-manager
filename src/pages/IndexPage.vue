<template>
  <q-page padding>
    <div class="column items-center">
      <q-img class="col logo" src="icons/store-manager-icon.png"></q-img>
      <h4 class="col">Store Manager</h4>
      <p class="col text-h5">{{ $t('index.subtitle') }}</p>
    </div>
    <div class="column items-center">
      <q-btn
        v-if="!userAuthenticated"
        class="q-ma-sm"
        color="primary"
        name="sign-btn"
        icon="login"
        :label="$t('auth.loginAction')"
        @click="$router.push({ name: 'signin' })"
      />
    </div>
    <div class="row justify-around">
      <q-card class="col-4 my-card q-my-md" flat bordered>
        <q-card-section class="flex flex-center">
          <q-img src="src/assets/example-product-page.PNG" />
        </q-card-section>
        <q-card-section class="text-center vertical-middle">
          {{ $t('index.createProductText') }}
        </q-card-section>
      </q-card>
      <q-card class="col-4 my-card q-my-md" flat bordered>
        <q-card-section class="flex flex-center">
          <q-img src="src/assets/example-customer-page.PNG" />
        </q-card-section>
        <q-card-section class="text-center vertical-middle">
          {{ $t('index.createCustomersText') }}
        </q-card-section>
      </q-card>
      <q-card class="col-4 my-card q-my-md" flat bordered>
        <q-card-section class="flex flex-center">
          <q-img src="src/assets/example-order-page.PNG" />
        </q-card-section>
        <q-card-section class="text-center">
          {{ $t('index.createOrdersText') }}
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { useUserStore } from 'stores/user-store';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const userStore = useUserStore();
    const userAuthenticated = computed(() => userStore.isAuthenticated);

    return {
      userAuthenticated,
    };
  },
});
</script>
<style lang="sass" scoped>
.my-card
  width: 500px
  max-width: 500px

.logo
  width: 100px
  max-width: 100px
</style>
