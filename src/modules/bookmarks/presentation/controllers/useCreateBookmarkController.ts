import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

import { useBookmarksStore } from 'src/modules/bookmarks/presentation/stores';

export const useCreateBookmarkController = () => {
  const quasar = useQuasar();

  const router = useRouter();

  const bookmarksStore = useBookmarksStore();

  const name = ref('');

  const url = ref('');

  const reset = () => {
    name.value = '';
    url.value = '';
  };

  const createBookmark = async () => {
    try {
      quasar.loading.show();

      await bookmarksStore.createBookmark(name.value, url.value);

      await router.push({ name: 'bookmarks' });
    } catch (error) {
      quasar.notify({ type: 'negative', message: (error as Error).message });
    } finally {
      quasar.loading.hide();
    }
  };

  return {
    name,
    url,
    reset,
    createBookmark,
  };
};
