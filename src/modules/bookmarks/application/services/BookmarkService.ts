/* eslint-disable class-methods-use-this */

import { Bookmark } from 'src/modules/bookmarks/domain/entities';
import { BookmarkRepository } from 'src/modules/bookmarks/domain/repositories';

export class BookmarkService {
  private bookmarkRepository: BookmarkRepository;

  constructor(bookmarkRepository: BookmarkRepository) {
    this.bookmarkRepository = bookmarkRepository;
  }

  private isValidName(value: string) {
    return value.length > 1;
  }

  private isValidHttpUrl(value: string) {
    try {
      const url = new URL(value);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  }

  async getBookmarks() {
    return this.bookmarkRepository.getAll();
  }

  async findBookmarkById(id: string) {
    return this.bookmarkRepository.findById(id);
  }

  async addBookmark(bookmark: Bookmark) {
    if (this.isValidName(bookmark.name) === false) throw new Error('Too short name');

    if (this.isValidHttpUrl(bookmark.url) === false) throw new Error('Invalid url');

    return this.bookmarkRepository.add(bookmark);
  }

  async updateBookmark(bookmark: Bookmark) {
    return this.bookmarkRepository.update(bookmark);
  }

  async deleteBookmark(id: string) {
    return this.bookmarkRepository.delete(id);
  }
}
