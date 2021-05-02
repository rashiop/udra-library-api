import { Document, Model, Types } from 'mongoose';

interface IAuthor {
  name: string;
  is_active: boolean;
  created_by: Types.ObjectId;
  updated_by: Types.ObjectId;
}

interface IAuthorDoc extends IAuthor, Document {
}

interface IAuthorModel extends Model<IAuthorDoc> {}

export { 
  IAuthor,
  IAuthorDoc,
  IAuthorModel
}