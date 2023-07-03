import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: () => import('pages/ErrorNotFound.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    redirect: {
      name: '404',
    },
  },
];

export default routes;
