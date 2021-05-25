import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';

import config from '../../config';
import { ActiveStatus } from '../../helper';
import { Gender, IUser, IUserDoc, IUserModel, Role } from './user.type';


const schemaFields: Record<keyof IUser, any> = {
  email: {
    required: [true],
    trim: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  firstname: {
    required: true,
    type: String,
  },
  lastname: String,
  gender: {
    default: Gender.MALE,
    enum: Gender,
    required: true,
    type: Number,
  },
  settings: {
    theme: {
      default: 'dark',
      type: String,
    },
    notification: {
      default: true,
      type: Boolean,
    },
    compact_mode: {
      default: false,
      type: Boolean,
    }
  },
  role: {
    default: Role.USER,
    enum: Role,
    required: true,
    type: String,
  },
  active_status: {
    type: String,
    enum: ActiveStatus,
    default: ActiveStatus.A
  },
}

const UserSchema: Schema<IUserDoc> = new Schema(schemaFields, { timestamps: true })

// https://security.stackexchange.com/questions/133239/what-is-the-specific-reason-to-prefer-bcrypt-or-pbkdf2-over-sha256-crypt-in-pass/133251#133251

UserSchema.pre<IUserDoc>('save', async function hashPassword() {
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(+config.secrets.salt_round);
      const hashed = await bcrypt.hash(this.password, salt);
      this.password = hashed;
    } catch(ex) {
      return ex;
    }
  }
})

UserSchema.virtual("fullname").get(function getFullname(this: IUserDoc) {
  return this.firstname + ' ' + this.lastname
})

UserSchema.method({
  getGender: function(this: IUserDoc) {
    return this.gender > 0 ? "Male" : "Female"
  },
  checkPassword: async function(this: IUserDoc, password: string) {
    const passwordHash = this.password;
    return await bcrypt.compare(password, passwordHash);
  }
})


const User = model<IUserDoc, IUserModel>('User', UserSchema);

export default User;
