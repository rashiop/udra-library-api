import { Document, Model, Types } from 'mongoose';

interface IBook {
  title: string;
  description: string;
  is_active: boolean;
  authors: Types.ObjectId[];
  genres: Types.ObjectId[];
  publisher: Types.ObjectId;
  created_by: Types.ObjectId;
  updated_by: Types.ObjectId;
}

interface IBookDoc extends IBook, Document {
  url: string;
  total: number;
  stock: number;
}

interface IBookModel extends Model<IBookDoc> {}

export { 
  IBook,
  IBookDoc,
  IBookModel
}