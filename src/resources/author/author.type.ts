import { Document, Model, Types } from 'mongoose';

import { ActiveStatus } from '../../helper';

interface IAuthor {
  first_name: string;
  last_name: string;
  active_status: ActiveStatus;
  date_of_birth: Date;
  date_of_death: Date;
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