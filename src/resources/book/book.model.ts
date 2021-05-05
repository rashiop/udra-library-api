import { model, Schema, Types } from 'mongoose';

import { bookUrl, error } from './book.constant';
import { ActiveStatus, IBook, IBookDoc, IBookModel } from './book.type';

const schemaFields: Record<keyof IBook, any> = {
  title: {
    type: String,
    required: [true, error.titleRequired],
    trim: true,
    maxLength: [1000, error.titleMaxLength],
    minLength: [1, error.titleMinLength]
  },
  authors: [{ type: Types.ObjectId, ref: 'Author', required: [true, error.authorRequired] }],
  genres: [{ type: Types.ObjectId, ref: 'Genre', required: [true, error.genreRequired] }],
  publisher: { type: Types.ObjectId, ref: 'Publisher', required: [true, error.publisherRequired] },
  updated_by: { type: Types.ObjectId, ref: 'User' },
  created_by: { type: Types.ObjectId, ref: 'User' },
  description: {
    type: String,
    maxLength: [1000, error.descriptionMaxLength],
    minLength: [1, error.descriptionMinLength]
  },
  active_status: {
    type: String,
    enum: ActiveStatus,
    default: ActiveStatus.A
  },
  total: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number,
    default: 0
  }
}

const bookSchema: Schema<IBookDoc> = new Schema(schemaFields,
  { timestamps: true }
)

bookSchema.virtual('url', function getUrl(this: IBookDoc) {
  return `${bookUrl}/${this._id}`
})

bookSchema.static('getOneById', async function getOneById(bookId: Types.ObjectId) {
  const book = await Book
    .findById(bookId)
    .populate('authors')
    .populate({
      path: 'genres',
      select: 'name'
    })
    .lean({ virtuals: true })
    .exec()
  return book;
})

bookSchema.static('getMany', async function getMany() {
  const book = await Book
    .find()
    .populate('authors')
    .populate({
      path: 'genres',
      select: 'name'
    })
    .lean({ virtuals: true })
    .exec()
  return book;
})

bookSchema.method({
  returnBook: async function(this: IBookDoc) {
    this.stock = Number(this.stock) + 1;
    await this.save();
  },
  borrowBook: async function(this: IBookDoc) {
    this.stock = Number(this.stock) - 1;
    await this.save();
  },
  addTotal: async function(this: IBookDoc) {
    this.total = Number(this.total) + 1;
    await this.save();
  },
  minTotal: async function(this: IBookDoc) {
    this.total = Number(this.total) - 1;
    await this.save();
  }
})

bookSchema.index({ title: 1 }, { unique: true })

const Book = model<IBookDoc, IBookModel>('Book', bookSchema)

export default Book;