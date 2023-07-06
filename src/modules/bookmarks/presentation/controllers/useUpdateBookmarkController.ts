import { useQuasar } from 'quasar';

import { useBookmarksStore } from 'src/modules/bookmarks/presentation/stores';

export const useUpdateBookmarkController = () => {
  const quasar = useQuasar();

  const bookmarksStore = useBookmarksStore();

  const updateBookmark = async (id: string, name: string, url: string) => {
    try {
      quasar.loading.show();

      await bookmarksStore.updateBookmark(id, name, url);

      quasar.notify({ type: 'positive', message: 'Bookmark updated' });
    } catch (error) {
      quasar.notify({ type: 'negative', message: (error as Error).message });
    } finally {
      quasar.loading.hide();
    }
  };

  return {
    updateBookmark,
  };
};
