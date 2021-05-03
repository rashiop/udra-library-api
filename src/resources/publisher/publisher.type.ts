import { Document, Model, Types } from 'mongoose';

interface IPublisher {
  name: string;
  is_active: boolean;
  created_by: Types.ObjectId;
  updated_by: Types.ObjectId;
}

interface IPublisherDoc extends IPublisher, Document {}

interface IPublisherModel extends Model<IPublisherDoc> {}

export { 
  IPublisher,
  IPublisherDoc,
  IPublisherModel
}