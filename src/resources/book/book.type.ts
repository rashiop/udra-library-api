import { Document, Model, Types } from 'mongoose';

interface IBook {
  title: string;
  description: string;
  is_active: boolean;
  author: Types.ObjectId[];
  genre: Types.ObjectId[];
  publisher: Types.ObjectId;
  created_by: Types.ObjectId;
  updated_by: Types.ObjectId;
  total?: number;
}

interface IBookDoc extends IBook, Document {}

interface IBookModel extends Model<IBookDoc> {}

export { 
  IBook,
  IBookDoc,
  IBookModel
}