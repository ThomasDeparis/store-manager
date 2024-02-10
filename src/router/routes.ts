import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'index',
        path: '',
        component: () => import('src/pages/IndexPage.vue'),
      },
      {
        name: 'products',
        path: 'products',
        component: () => import('src/pages/ProductsPage.vue'),
      },
      {
        name: 'signin',
        path: 'signin',
        component: () => import('pages/SignIn.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
