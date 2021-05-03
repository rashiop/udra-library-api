import moment from 'moment';
import { model, Schema, Types } from 'mongoose';

import { error } from './bookTransaction.constant';
import { IBookTransaction, IBookTransactionDoc, IBookTransactionModel } from './bookTransaction.type';

const schemaFields: Record<keyof IBookTransaction, any> = {
  user: { type: Schema.Types.ObjectId, ref: 'User', required: [true, error.userRequired] },
  book: { type: Schema.Types.ObjectId, ref: 'User', required: [true, error.userRequired] },
  created_by: { type: Schema.Types.ObjectId, ref: 'User' },
  updated_by: { type: Schema.Types.ObjectId, ref: 'User' },
  is_active: {
    type: Boolean,
    default: true
  },
  start_date: {
    type: Date,
    default: moment().utc().format(),
    required: true
  },
  end_date: {
    type: Date,
    default: moment().add(7, 'days').utc().format(),
    required: true
  },
  return_date: {
    type: Date
  },
  total_fine: Number,
  late_day: Number
}

const bookTransactionSchema: Schema<IBookTransactionDoc> = new Schema(schemaFields,
  { timestamps: true }
)

bookTransactionSchema.virtual('late_day').get(function getFine(this: IBookTransactionDoc) {
  const late_day = moment().diff(this.end_date, 'days');
  return late_day || 0;
});

bookTransactionSchema.method({
  calcFine: async function(this: IBookTransactionDoc) {
    // TODO: change hardcoded ke table
    if (!this.late_day) return 0;
    return Number(this.late_day) * 2500
  },
  returnBook: async function(this: IBookTransactionDoc, userId: Types.ObjectId){
    this.total_fine = await this.calcFine()
    this.is_active = false
    this.return_date = moment().utc().format()
    this.updated_by = userId
    return await this.save()
  }
})

const BookTransaction = model<IBookTransactionDoc, IBookTransactionModel>('BookTransaction', bookTransactionSchema)


export default BookTransaction;

