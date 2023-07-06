/* eslint-disable class-methods-use-this */

import { UidGenerator } from 'src/shared/infrastructure/interfaces';

import { BookmarkRepository } from 'src/modules/bookmarks/domain/repositories';

export class BookmarkService {
  private bookmarkRepository: BookmarkRepository;

  private uidGenerator: UidGenerator;

  constructor(
    bookmarkRepository: BookmarkRepository,
    uidGenerator: UidGenerator,
  ) {
    this.bookmarkRepository = bookmarkRepository;
    this.uidGenerator = uidGenerator;
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

  async addBookmark(name: string, url: string) {
    if (this.isValidName(name) === false) throw new Error('Invalid name');

    if (this.isValidHttpUrl(url) === false) throw new Error('Invalid url');

    const bookmark = {
      id: this.uidGenerator.generate(),
      name,
      url,
    };

    return this.bookmarkRepository.add(bookmark);
  }

  async updateBookmark(id: string, name: string, url: string) {
    if (this.isValidName(name) === false) throw new Error('Invalid name');

    if (this.isValidHttpUrl(url) === false) throw new Error('Invalid url');

    const bookmark = {
      id,
      name,
      url,
    };

    return this.bookmarkRepository.update(bookmark);
  }

  async deleteBookmark(id: string) {
    return this.bookmarkRepository.delete(id);
  }
}
