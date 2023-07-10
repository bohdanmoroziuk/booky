import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import { AxiosHttpClient, QuasarUidGenerator } from 'src/shared/adapters';

import { Bookmark } from 'src/modules/bookmarks/domain/entities';
import { HttpBookmarkRepository } from 'src/modules/bookmarks/data/repositories';
import { BookmarkService } from 'src/modules/bookmarks/application/services';

export interface BookmarksStoreState {
  bookmarks: Bookmark[];
  bookmark: Bookmark | undefined;
}

export const useBookmarksStore = defineStore('bookmarks', () => {
  const httpClient = new AxiosHttpClient('http://localhost:3000');

  const uidGenerator = new QuasarUidGenerator();

  const bookmarkRepository = new HttpBookmarkRepository(httpClient);

  const bookmarkService = new BookmarkService(bookmarkRepository, uidGenerator);

  // State

  const state = ref<BookmarksStoreState>({
    bookmarks: [],
    bookmark: undefined,
  });

  // Getters

  const bookmark = computed(() => state.value.bookmark);

  const bookmarks = computed(() => state.value.bookmarks);

  const totalBookmarks = computed(() => state.value.bookmarks.length);

  // Actions

  async function getBookmarks() {
    state.value.bookmarks = await bookmarkService.getBookmarks();
  }

  async function createBookmark(name: string, url: string) {
    const createdBookmark = await bookmarkService.addBookmark(name, url);

    state.value.bookmarks = [
      ...state.value.bookmarks,
      createdBookmark,
    ];
  }

  async function deleteBookmark(id: string) {
    await bookmarkService.deleteBookmark(id);

    state.value.bookmarks = state.value.bookmarks.filter((bookmark) => bookmark.id !== id);
  }

  async function getBookmarkById(id: string) {
    const maybeBookmark = await bookmarkService.findBookmarkById(id);

    if (maybeBookmark) {
      state.value.bookmark = maybeBookmark;
    }
  }

  async function updateBookmark(id: string, name: string, url: string, createdAt: number) {
    const updatedBookmark = await bookmarkService.updateBookmark(id, name, url, createdAt);

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
