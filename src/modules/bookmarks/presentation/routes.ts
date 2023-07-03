import { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'bookmarks',
    component: () => import('src/modules/bookmarks/presentation/pages/BookmarksView.vue'),
  },
];
