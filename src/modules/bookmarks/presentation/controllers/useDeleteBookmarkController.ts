import { useQuasar } from 'quasar';

import { useBookmarksStore } from 'src/modules/bookmarks/presentation/stores';

export const useDeleteBookmarkController = () => {
  const quasar = useQuasar();

  const bookmarksStore = useBookmarksStore();

  const deleteBookmark = async (id: string) => {
    try {
      quasar.loading.show();
      await bookmarksStore.deleteBookmark(id);
      quasar.notify({ type: 'positive', message: 'Bookmark deleted' });
    } catch (error) {
      quasar.notify({ type: 'negative', message: (error as Error).message });
    } finally {
      quasar.loading.hide();
    }
  };

  return {
    deleteBookmark,
  };
};
