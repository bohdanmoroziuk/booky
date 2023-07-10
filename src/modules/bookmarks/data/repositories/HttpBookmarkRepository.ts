import { HttpClient } from 'src/shared/ports';

import { Bookmark, BookmarkRepository } from 'src/modules/bookmarks/domain';

export class HttpBookmarkRepository implements BookmarkRepository {
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  async getAll(): Promise<Bookmark[]> {
    return this.http.get('/bookmarks');
  }

  async findById(id: string): Promise<Bookmark | undefined> {
    return this.http.get(`/bookmarks/${id}`);
  }

  async add(bookmark: Bookmark): Promise<Bookmark> {
    return this.http.post('/bookmarks', bookmark);
  }

  async update(bookmark: Bookmark): Promise<Bookmark> {
    return this.http.put(`/bookmarks/${bookmark.id}`, bookmark);
  }

  async delete(id: string): Promise<void> {
    return this.http.delete(`/bookmarks/${id}`);
  }
}
