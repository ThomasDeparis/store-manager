<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          :aria-label="$t('menu.menu')"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title
          >Store Manager
          <q-badge outline align="middle" color="white">
            v0.0.1
          </q-badge></q-toolbar-title
        >
        <q-icon v-if="!!user?.email" name="account_circle" size="sm"></q-icon>
        <p class="text-body2 q-ma-sm">{{ user?.email }}</p>
        <div>
          <q-btn
            flat
            name="sign-btn"
            :icon-right="signButton.icon"
            :label="signButton.label"
            @click="signButton.onSign"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import EssentialLink from 'components/EssentialLink.vue';
import { useUserStore } from 'stores/user-store';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const { t } = useI18n();
    const router = useRouter();
    const leftDrawerOpen = ref(false);

    const userStore = useUserStore();
    const user = computed(() => userStore.userData);

    const menuLinks = [
      {
        title: t('menu.products'),
        caption: '',
        icon: 'manage_search',
        routeName: 'products',
      },
      {
        title: t('menu.providers'),
        caption: '',
        icon: 'store',
        routeName: 'providers',
      },
      {
        title: t('menu.orders'),
        caption: '',
        icon: 'shopping_cart',
        routeName: 'orders',
      },
      {
        title: t('menu.sales'),
        caption: '',
        icon: 'shopping_cart',
        routeName: 'sales',
      },
    ];

    onMounted(() => {
      userStore.fetchUser();
    });

    const signButton = computed(() => {
      if (user?.value) {
        return {
          onSign: userStore.signOut,
          label: t('auth.logoutAction'),
          icon: 'logout',
        };
      } else {
        return {
          onSign: () => router.push({ name: 'signin' }),
          label: t('auth.loginAction'),
          icon: 'login',
        };
      }
    });

    return {
      essentialLinks: menuLinks,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      user,
      signButton,
    };
  },
});
</script>
