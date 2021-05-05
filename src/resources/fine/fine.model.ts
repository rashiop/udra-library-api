import { model, Schema } from 'mongoose';

import { ActiveStatus } from '../../helper/activeStatus';
import { error } from './fine.constant';
import { IFine, IFineDoc, IFineModel } from './fine.type';

const schemaFields: Record<keyof IFine, any> = {
  amount: {
    type: Number,
    required: [true, error.amountRequired]
  },
  updated_by: { type: Schema.Types.ObjectId, ref: 'User' },
  created_by: { type: Schema.Types.ObjectId, ref: 'User' },
  active_status: {
    type: String,
    enum: ActiveStatus,
    default: ActiveStatus.A
  },
}

const fineSchema: Schema<IFineDoc> = new Schema(schemaFields,
  { timestamps: true }
)

fineSchema.static('calcFine', async function calcFine(days: number = 0) {
  if (days == 0) return 0;
  
  const fine = await Fine.findOne({ active_status: ActiveStatus.A }).lean().exec()
  const total = fine ? fine.amount * days : 0;
  return total;
})

fineSchema.static('getLatestFine', async function getLatestFine() {
  const fine = await Fine.findOne({ active_status: ActiveStatus.A }).lean().exec()
  return fine ? fine.amount : 0;
})

fineSchema.pre<IFineDoc>('save', async function deactiveFine(){
  try {
    await Fine.findOneAndUpdate(
      { active_status: ActiveStatus.A },
      { active_status: ActiveStatus.D }
    )
  } catch(ex) {
    return ex;
  }
})
const Fine = model<IFineDoc, IFineModel>('Fine', fineSchema)

export default Fine;