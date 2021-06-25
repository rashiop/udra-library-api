import { Document, Model, Types } from 'mongoose';

import { ActiveStatus } from '../../helper';

interface IBookTransaction {
  book: Types.ObjectId;
  created_by: Types.ObjectId;
  updated_by: Types.ObjectId;
  active_status?: ActiveStatus;
  start_date: Date;
  return_date?: Date | string;
  total_fine?: number;
}

interface IBookTransactionDoc extends IBookTransaction, Document {
  late_day?: number;
  end_date: Date;
  returnBook(userId: Types.ObjectId): void;
}

interface IBookTransactionModel extends Model<IBookTransactionDoc> {
  getByUserId(userId: Types.ObjectId | string, active_status: ActiveStatus): IBookTransaction[] | null
}

export {
  IBookTransaction,
  IBookTransactionDoc,
  IBookTransactionModel
}