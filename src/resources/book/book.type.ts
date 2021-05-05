import { Document, Model, Types } from 'mongoose';

enum ActiveStatus {
  A = 'active',
  D = 'deleted'
}
interface IBook {
  title: string;
  description: string;
  active_status: ActiveStatus;
  authors: Types.ObjectId[];
  genres: Types.ObjectId[];
  publisher: Types.ObjectId;
  created_by: Types.ObjectId;
  updated_by: Types.ObjectId;
  total: number;
  stock: number;
}

interface IBookDoc extends IBook, Document {
  url: string;
  returnBook(): void;
  borrowBook(): void;
  addTotal(): void;
  minTotal(): void;
}

interface IBookModel extends Model<IBookDoc> {
  getOneById(bookId: unknown): IBookDoc | null;
  getMany(): IBookDoc[] | null;

}

export { 
  ActiveStatus,
  IBook,
  IBookDoc,
  IBookModel
}