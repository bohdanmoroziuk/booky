import { RouteRecordRaw } from 'vue-router';

import { routes as bookmarksRoutes } from 'src/modules/bookmarks/presentation';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      ...bookmarksRoutes,
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
