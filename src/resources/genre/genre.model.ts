import { model, Schema } from 'mongoose';

import { IGenre, IGenreDoc, IGenreModel } from './genre.type';

const schemaFields: Record<keyof IGenre, any> = {
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
    minLength: 4
  },
  updated_by: { type: Schema.Types.ObjectId, ref: 'User' },
  created_by: { type: Schema.Types.ObjectId, ref: 'User' },
  is_active: {
    type: Boolean,
    default: true
  }
}

const genreSchema: Schema<IGenreDoc> = new Schema(schemaFields,
  { timestamps: true }
)

genreSchema.index({ name: 1 }, { unique: true })

const Genre = model<IGenreDoc, IGenreModel>('Genre', genreSchema)

export default Genre;