import { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'bookmarks',
    component: () => import('src/modules/bookmarks/presentation/pages/Bookmarks.vue'),
  },
  {
    path: 'create',
    name: 'create-bookmark',
    component: () => import('src/modules/bookmarks/presentation/pages/BookmarkCreate.vue'),
  },
];
