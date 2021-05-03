import { model, Schema } from 'mongoose';

import { error } from './book.constant';
import { IBook, IBookDoc, IBookModel } from './book.type';

const schemaFields: Record<keyof IBook, any> = {
  title: {
    type: String,
    required: [true, error.titleRequired],
    trim: true,
    maxLength: [1000, error.titleMaxLength],
    minLength: [1, error.titleMinLength]
  },
  author: [{ type: Schema.Types.ObjectId, ref: 'Author', required: [true, error.authorRequired] }],
  genre: [{ type: Schema.Types.ObjectId, ref: 'Genre', required: [true, error.genreRequired] }],
  publisher: { type: Schema.Types.ObjectId, ref: 'Publisher', required: [true, error.publisherRequired] },
  updated_by: { type: Schema.Types.ObjectId, ref: 'User' },
  created_by: { type: Schema.Types.ObjectId, ref: 'User' },
  description: {
    type: String,
    maxLength: [1000, error.descriptionMaxLength],
    minLength: [1, error.descriptionMinLength]
  },
  total: Number,
  is_active: {
    type: Boolean,
    default: true
  }
}

const bookSchema: Schema<IBookDoc> = new Schema(schemaFields,
  { timestamps: true }
)

bookSchema.index({ title: 1 }, { unique: true })

const Book = model<IBookDoc, IBookModel>('Book', bookSchema)

export default Book;