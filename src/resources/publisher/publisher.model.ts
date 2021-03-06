import { model, Schema } from 'mongoose';

import config from '../../config';
import { ActiveStatus } from '../../helper';
import { error } from './publisher.constant';
import { IPublisher, IPublisherDoc, IPublisherModel } from './publisher.type';

const schemaFields: Record<keyof IPublisher, any> = {
  name: {
    type: String,
    required: [true, error.nameRequired],
    trim: true,
    maxLength: [255, error.nameMaxLength],
    minLength: [4, error.nameMinLength]
  },
  updated_by: { type: Schema.Types.ObjectId, ref: 'User' },
  created_by: { type: Schema.Types.ObjectId, ref: 'User' },
  active_status: {
    type: String,
    enum: ActiveStatus,
    default: ActiveStatus.A
  },
}

const publisherSchema: Schema<IPublisherDoc> = new Schema(schemaFields,
  { timestamps: true }
)

publisherSchema.index({ name: 1 }, { unique: true })

const Publisher = model<IPublisherDoc, IPublisherModel>('Publisher', publisherSchema, undefined, config.skipInitDb)

export default Publisher;