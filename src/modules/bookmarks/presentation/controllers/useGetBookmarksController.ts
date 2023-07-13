import { useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';

import { useBookmarksStore } from 'src/modules/bookmarks/presentation/stores';

export const useGetBookmarksController = () => {
  const quasar = useQuasar();

  const bookmarksStore = useBookmarksStore();

  const { bookmarks, totalBookmarks, hasBookmarks } = storeToRefs(bookmarksStore);

  const getBookmarks = async () => {
    try {
      quasar.loading.show();
      await bookmarksStore.getBookmarks();
    } catch (error) {
      quasar.notify({ type: 'negative', message: (error as Error).message });
    } finally {
      quasar.loading.hide();
    }
  };

  return {
    bookmarks,
    totalBookmarks,
    hasBookmarks,
    getBookmarks,
  };
};
