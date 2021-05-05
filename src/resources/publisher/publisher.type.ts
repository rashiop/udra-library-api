import { Document, Model, Types } from 'mongoose';

import { ActiveStatus } from '../../helper/activeStatus';

interface IPublisher {
  name: string;
  active_status: ActiveStatus;
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