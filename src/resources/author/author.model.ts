import moment from 'moment';
import { model, Schema } from 'mongoose';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

import config from '../../config';
import { ActiveStatus } from '../../helper';
import { authorUrl, error } from './author.constant';
import { IAuthor, IAuthorDoc, IAuthorModel } from './author.type';

const schemaFields: Record<keyof IAuthor, any> = {
  first_name: {
    type: String,
    required: [true, error.firstNameRequired],
    trim: true,
    maxLength: [1000, error.firstNameMaxLength]
  },
  last_name: {
    type: String,
    required: [true, error.lastNameRequired],
    trim: true,
    maxLength: [1000, error.lastNameMaxLength],
  },
  updated_by: { type: Schema.Types.ObjectId, ref: 'User' },
  created_by: { type: Schema.Types.ObjectId, ref: 'User' },
  active_status: {
    type: String,
    enum: ActiveStatus,
    default: ActiveStatus.A
  },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
}

const authorSchema: Schema<IAuthorDoc> = new Schema(schemaFields,
  { timestamps: true }
)

authorSchema
.virtual('full_name')
.get(function fullname(this: IAuthorDoc) {
  return this.first_name + ' ' + this.last_name
})

authorSchema
.virtual('lifespan')
.get(function lifespan(this: IAuthorDoc) {
  return moment(this.date_of_death).diff(this.date_of_birth, 'years')
})

authorSchema
.virtual('url')
.get(function url(this: IAuthorDoc) {
  return `${authorUrl}/${this._id}`
})

authorSchema.plugin(mongooseLeanVirtuals);

const Author = model<IAuthorDoc, IAuthorModel>('Author', authorSchema, undefined, config.skipInitDb)

export default Author;