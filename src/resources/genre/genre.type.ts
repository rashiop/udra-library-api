import { Document, Model, Types } from 'mongoose';

import { ActiveStatus } from '../../helper';

interface IGenre {
  name: string;
  active_status: ActiveStatus;
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