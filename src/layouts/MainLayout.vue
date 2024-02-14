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

        <q-toolbar-title> Quasar App </q-toolbar-title>

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

    <q-drawer v-model="leftDrawerOpen" side="left" show-if-above bordered>
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
        icon: 'school',
        routeName: 'products',
      },
    ];

    onMounted(() => {
      userStore.fetchUser();
    });

    const signButton = computed(() => {
      if (user?.value) {
        return {
          onSign: userStore.signOut,
          label: user?.value?.email ?? '',
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
