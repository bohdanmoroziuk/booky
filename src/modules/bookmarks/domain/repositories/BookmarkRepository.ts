import { Bookmark } from 'src/modules/bookmarks/domain/entities';

export interface BookmarkRepository {
  getAll(): Promise<Bookmark[]>;
  findById(id: string): Promise<Bookmark | undefined>;
  add(bookmark: Bookmark): Promise<Bookmark>;
  update(bookmark: Bookmark): Promise<Bookmark>;
  delete(id: string): Promise<void>;
}
