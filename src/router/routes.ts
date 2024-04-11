import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'index',
        path: '',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        name: 'products',
        path: 'products',
        component: () => import('pages/ProductsPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        name: 'providers',
        path: 'providers',
        component: () => import('pages/ProvidersPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        name: 'signin',
        path: 'signin',
        component: () => import('pages/SignIn.vue'),
      },
      {
        name: 'orders',
        path: 'orders',
        component: () => import('pages/OrdersPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        name: 'provider-neworder',
        path: 'providers/:providerId/orders/new',
        component: () => import('pages/NewOrderPage.vue'),
        props: true,
        meta: { requiresAuth: true },
      },
      {
        name: 'neworder',
        path: 'orders/new',
        component: () => import('pages/NewOrderPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        name: 'customers',
        path: 'customers',
        component: () => import('pages/CustomersPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        name: 'sales',
        path: 'sales',
        component: () => import('pages/SalesPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        name: 'customer-newsale',
        path: 'customers/:customerId/sales/new',
        component: () => import('pages/NewSalePage.vue'),
        props: true,
        meta: { requiresAuth: true },
      },
      {
        name: 'newsale',
        path: 'sales/new',
        component: () => import('pages/NewSalePage.vue'),
        meta: { requiresAuth: true },
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
