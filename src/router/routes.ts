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
      },
      {
        name: 'providers',
        path: 'providers',
        component: () => import('pages/ProvidersPage.vue'),
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
      },
      {
        name: 'provider-neworder',
        path: 'providers/:providerId/orders/new',
        component: () => import('pages/NewOrderPage.vue'),
        props: true,
      },
      {
        name: 'neworder',
        path: 'orders/new',
        component: () => import('pages/NewOrderPage.vue'),
      },
      {
        name: 'customers',
        path: 'customers',
        component: () => import('pages/CustomersPage.vue'),
      },
      {
        name: 'sales',
        path: 'sales',
        component: () => import('pages/SalesPage.vue'),
      },
      {
        name: 'customer-newsale',
        path: 'customers/:customerId/sales/new',
        component: () => import('pages/NewSalePage.vue'),
        props: true,
      },
      {
        name: 'newsale',
        path: 'sales/new',
        component: () => import('pages/NewSalePage.vue'),
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
