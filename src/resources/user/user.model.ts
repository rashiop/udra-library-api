import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';

import config from '../../config';
import { commonErrors } from '../../lib/errorManagement';
import { Gender, IUser, IUserBase, IUserBaseDoc, Role } from './user.type';


const schemaFields: Record<keyof IUserBase, any> = {
  email: {
    required: true,
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
      required: true,
      type: String,
    },
    notification: {
      default: true,
      required: true,
      type: Boolean,
    },
    compactMode: {
      default: false,
      required: true,
      type: Boolean,
    }
  },
  role: {
    default: Role.USER,
    enum: Role,
    required: true,
    type: String,
  },
  isActive: {
    default: true,
    type: Boolean,
  }
}

const UserSchema: Schema<IUserBaseDoc> = new Schema(schemaFields, { timestamps: true })

UserSchema.pre<IUser>('save', async function hashPassword() {
  if (this.isModified('password')) {
    try {
      const hashed = await bcrypt.hash(this.password, config.secrets.salt_round);
      this.password = hashed;
    } catch(ex) {
      return ex;
    }
  }
})

UserSchema.virtual("fullname").get(function getFullname(this: IUserBaseDoc) {
  return this.firstname + ' ' + this.lastname
})

UserSchema.method({
  getGender: function(this: IUserBaseDoc) {
    return this.gender > 0 ? "Male" : "Female"
  },
  checkPassword: async function(this: IUserBaseDoc, password: string) {
    const passwordHash = this.password;
    try {
      const valid = await bcrypt.compare(password, passwordHash);
      if (!valid) {
        throw commonErrors.UnauthorizedError({
          message: 'Invalid username/password'
        })
      }
    } catch(ex) {
      return ex;
    }
  }
})


const User = model<IUser>('User', UserSchema);

export { User };
