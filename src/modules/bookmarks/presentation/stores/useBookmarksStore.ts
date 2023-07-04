import { ref, computed } from 'vue';
import { uid } from 'quasar';
import { defineStore } from 'pinia';

import { AxiosHttpClient } from 'src/shared/infrastructure/services';

import { Bookmark } from 'src/modules/bookmarks/domain/entities';
import { HttpBookmarkRepository } from 'src/modules/bookmarks/infrastructure/repositories';
import { BookmarkService } from 'src/modules/bookmarks/application/services';

export interface BookmarksStoreState {
  bookmarks: Bookmark[];
}

export const useBookmarksStore = defineStore('bookmarks', () => {
  const httpClient = new AxiosHttpClient('http://localhost:3000');

  const bookmarkRepository = new HttpBookmarkRepository(httpClient);

  const bookmarkService = new BookmarkService(bookmarkRepository);

  // State

  const state = ref<BookmarksStoreState>({
    bookmarks: [],
  });

  // Getters

  const bookmarks = computed(() => state.value.bookmarks);

  const totalBookmarks = computed(() => state.value.bookmarks.length);

  // Actions

  async function getBookmarks() {
    try {
      state.value.bookmarks = await bookmarkService.getBookmarks();
    } catch (error) {
      state.value.bookmarks = [];
    }
  }

  async function createBookmark(name: string, url: string) {
    const bookmark = {
      id: uid(),
      name,
      url,
    };

    await bookmarkService.addBookmark(bookmark);

    state.value.bookmarks = [
      ...state.value.bookmarks,
      bookmark,
    ];
  }

  async function deleteBookmark(id: string) {
    await bookmarkService.deleteBookmark(id);

    state.value.bookmarks = state.value.bookmarks.filter((bookmark) => bookmark.id !== id);
  }

  return {
    bookmarks,
    totalBookmarks,
    getBookmarks,
    createBookmark,
    deleteBookmark,
  };
});
