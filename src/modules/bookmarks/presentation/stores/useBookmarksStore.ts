import { ref, computed } from 'vue';
import { uid } from 'quasar';
import { defineStore } from 'pinia';

import { AxiosHttpClient } from 'src/shared/infrastructure/services';

import { Bookmark } from 'src/modules/bookmarks/domain/entities';
import { HttpBookmarkRepository } from 'src/modules/bookmarks/infrastructure/repositories';
import { BookmarkService } from 'src/modules/bookmarks/application/services';

export interface BookmarksStoreState {
  bookmarks: Bookmark[];
  bookmark: Bookmark | null;
}

export const useBookmarksStore = defineStore('bookmarks', () => {
  const httpClient = new AxiosHttpClient('http://localhost:3000');

  const bookmarkRepository = new HttpBookmarkRepository(httpClient);

  const bookmarkService = new BookmarkService(bookmarkRepository);

  // State

  const state = ref<BookmarksStoreState>({
    bookmarks: [],
    bookmark: null,
  });

  // Getters

  const bookmark = computed(() => state.value.bookmark);

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

  async function getBookmarkById(id: string) {
    const maybeBookmark = await bookmarkService.findBookmarkById(id);

    if (!maybeBookmark) throw new Error('Bookmark not found');

    state.value.bookmark = maybeBookmark;
  }

  async function updateBookmark(id: string, name: string, url: string) {
    const updatedBookmark = await bookmarkService.updateBookmark({ id, name, url });

    state.value.bookmarks = state.value.bookmarks.map((bookmark) => (
      bookmark.id === id
        ? updatedBookmark
        : bookmark
    ));
  }

  return {
    bookmark,
    bookmarks,
    totalBookmarks,
    getBookmarks,
    createBookmark,
    deleteBookmark,
    getBookmarkById,
    updateBookmark,
  };
});
