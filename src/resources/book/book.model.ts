import { model, Schema } from 'mongoose';

import { bookUrl, error } from './book.constant';
import { IBook, IBookDoc, IBookModel } from './book.type';

const schemaFields: Record<keyof IBook, any> = {
  title: {
    type: String,
    required: [true, error.titleRequired],
    trim: true,
    maxLength: [1000, error.titleMaxLength],
    minLength: [1, error.titleMinLength]
  },
  authors: [{ type: Schema.Types.ObjectId, ref: 'Author', required: [true, error.authorRequired] }],
  genres: [{ type: Schema.Types.ObjectId, ref: 'Genre', required: [true, error.genreRequired] }],
  publisher: { type: Schema.Types.ObjectId, ref: 'Publisher', required: [true, error.publisherRequired] },
  updated_by: { type: Schema.Types.ObjectId, ref: 'User' },
  created_by: { type: Schema.Types.ObjectId, ref: 'User' },
  description: {
    type: String,
    maxLength: [1000, error.descriptionMaxLength],
    minLength: [1, error.descriptionMinLength]
  },
  is_active: {
    type: Boolean,
    default: true
  }
}

const bookSchema: Schema<IBookDoc> = new Schema(schemaFields,
  { timestamps: true }
)

bookSchema.virtual('url', function getUrl(this: IBookDoc) {
  return `${bookUrl}/${this._id}`
})

// TODO: remove hardcode 0
bookSchema.virtual('stock', function getStock(this: IBookDoc) {
  return 0;
})
// TODO: remove hardcode 0
bookSchema.virtual('total', function getTotal(this: IBookDoc) {
  return 0;
})

bookSchema.index({ title: 1 }, { unique: true })

const Book = model<IBookDoc, IBookModel>('Book', bookSchema)

export default Book;