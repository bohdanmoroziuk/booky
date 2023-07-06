import { useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';

import { useBookmarksStore } from 'src/modules/bookmarks/presentation/stores';

export const useGetBookmarkByIdController = () => {
  const quasar = useQuasar();

  const bookmarksStore = useBookmarksStore();

  const { bookmark } = storeToRefs(bookmarksStore);

  const getBookmarkById = async (id: string) => {
    try {
      quasar.loading.show();
      await bookmarksStore.getBookmarkById(id);
    } catch (error) {
      quasar.notify({ type: 'negative', message: (error as Error).message });
    } finally {
      quasar.loading.hide();
    }
  };

  return {
    bookmark,
    getBookmarkById,
  };
};
