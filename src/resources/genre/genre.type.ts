import { Document, Model, Types } from 'mongoose';

interface IGenre {
  name: string;
  is_active: boolean;
  created_by: Types.ObjectId;
  updated_by: Types.ObjectId;
}

interface IGenreDoc extends IGenre, Document {
}

interface IGenreModel extends Model<IGenreDoc> {}

export { 
  IGenre,
  IGenreDoc,
  IGenreModel
}