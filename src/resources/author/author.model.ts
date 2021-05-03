import { model, Schema } from 'mongoose';

import { error } from './author.constant';
import { IAuthor, IAuthorDoc, IAuthorModel } from './author.type';

const schemaFields: Record<keyof IAuthor, any> = {
  name: {
    type: String,
    required: [true, error.nameRequired],
    trim: true,
    maxLength: [1000, error.nameMaxLength],
    minLength: [4, error.nameMinLength]
  },
  updated_by: { type: Schema.Types.ObjectId, ref: 'User' },
  created_by: { type: Schema.Types.ObjectId, ref: 'User' },
  is_active: {
    type: Boolean,
    default: true
  }
}

const authorSchema: Schema<IAuthorDoc> = new Schema(schemaFields,
  { timestamps: true }
)

const Author = model<IAuthorDoc, IAuthorModel>('Author', authorSchema)

export default Author;