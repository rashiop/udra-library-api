import { model, Schema } from 'mongoose';

import { IPublisher, IPublisherDoc, IPublisherModel } from './publisher.type';

const schemaFields: Record<keyof IPublisher, any> = {
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 255,
    minLength: 4
  },
  updated_by: { type: Schema.Types.ObjectId, ref: 'User' },
  created_by: { type: Schema.Types.ObjectId, ref: 'User' },
  is_active: {
    type: Boolean,
    default: true
  }
}

const publisherSchema: Schema<IPublisherDoc> = new Schema(schemaFields,
  { timestamps: true }
)

publisherSchema.index({ name: 1 }, { unique: true })

const Publisher = model<IPublisherDoc, IPublisherModel>('Publisher', publisherSchema)

export default Publisher;