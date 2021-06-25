import { Document, Model, Types } from 'mongoose';

import { ActiveStatus } from '../../helper';

interface IFine {
  amount: number;
  active_status: ActiveStatus;
  created_by: Types.ObjectId;
  updated_by: Types.ObjectId;
}

interface IFineDoc extends IFine, Document {}

interface IFineModel extends Model<IFineDoc> {
  calcFine(days: number): number;
  getLatestFine(): number;
}

export {
  IFine,
  IFineDoc,
  IFineModel
}