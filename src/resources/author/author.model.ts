import { model, Schema } from 'mongoose';

import { IAuthor, IAuthorDoc, IAuthorModel } from './author.type';

const schemaFields: Record<keyof IAuthor, any> = {
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

const authorSchema: Schema<IAuthorDoc> = new Schema(schemaFields,
  { timestamps: true }
)

authorSchema.index({ name: 1 }, { unique: true })

const Author = model<IAuthorDoc, IAuthorModel>('Author', authorSchema)

export default Author;