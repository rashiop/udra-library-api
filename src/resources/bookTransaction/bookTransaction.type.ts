import { Document, Model, Types } from 'mongoose';

interface IBookTransaction {
  user: Types.ObjectId;
  book: Types.ObjectId;
  created_by: Types.ObjectId;
  updated_by: Types.ObjectId;
  is_active: boolean;
  end_date: Date;
  start_date: Date;
  return_date?: Date | string;
  total_fine?: Number;
  late_day?: Number;
}

interface IBookTransactionDoc extends IBookTransaction, Document {
  late_day?: Number;
  calcFine(): Number;
  returnBook(userId: Types.ObjectId): void;
}

interface IBookTransactionModel extends Model<IBookTransactionDoc> {}

export { 
  IBookTransaction,
  IBookTransactionDoc,
  IBookTransactionModel
}