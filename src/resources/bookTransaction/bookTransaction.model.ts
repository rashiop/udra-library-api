import moment from 'moment';
import { model, Schema, Types } from 'mongoose';

import { ActiveStatus } from '../../helper';
import { Book } from '../book';
import { Fine } from '../fine';
import { error } from './bookTransaction.constant';
import { IBookTransaction, IBookTransactionDoc, IBookTransactionModel } from './bookTransaction.type';


const schemaFields: Record<keyof IBookTransaction, any> = {
  book: { type: Types.ObjectId, ref: 'Book', required: [true, error.bookRequired] },
  created_by: { type: Types.ObjectId, ref: 'User' },
  updated_by: { type: Types.ObjectId, ref: 'User' },
  active_status: {
    type: String,
    enum: ActiveStatus,
    default: ActiveStatus.A
  },
  start_date: {
    type: Date,
    default: moment().utc().format(),
    required: true
  },
  return_date: {
    type: Date
  },
  total_fine: Number
}

const bookTransactionSchema: Schema<IBookTransactionDoc> = new Schema(schemaFields,
  { timestamps: true }
)

bookTransactionSchema.virtual('end_date').get(function getFine(this: IBookTransactionDoc) {
  const end_date = moment(this.start_date).add(7, 'days').utc().format();
  return end_date;
});

bookTransactionSchema.virtual('late_day').get(function getFine(this: IBookTransactionDoc) {
  const late_day = moment().diff(this.end_date, 'days');
  return late_day > 0 ? late_day : 0;
});

bookTransactionSchema.method({
  returnBook: async function(this: IBookTransactionDoc, userId: Types.ObjectId){
    try {
      this.total_fine = await Fine.calcFine(Number(this.late_day))
      this.active_status = ActiveStatus.D
      this.return_date = moment().utc().format()
      this.updated_by = userId
      await this.save()
      
      const book = await Book.findById(this.book)
      if (book) book.returnBook();
      return this;
    } catch(ex) {
      return ex;
    }
  }
})

bookTransactionSchema.static('getByUserId', async function getByUserId(userId: Types.ObjectId | string, active_status: ActiveStatus) {
  try {
    const userTransactions = await BookTransaction.find({
      created_by: userId,
      active_status: active_status
    }).lean().exec()
    return userTransactions || []
  } catch(ex) {
    return ex;
  }
})

bookTransactionSchema.pre<IBookTransactionDoc>('save', async function borrowBook(this: IBookTransactionDoc){
  try {
    const book = await Book.findById(this.book)
    if (book) book.borrowBook();
  } catch(ex) {
    return ex;
  }
})

const BookTransaction = model<IBookTransactionDoc, IBookTransactionModel>('BookTransaction', bookTransactionSchema)


export default BookTransaction;

