import { Document, Model } from 'mongoose';

// https://hackernoon.com/how-to-link-mongoose-and-typescript-for-a-single-source-of-truth-94o3uqc

enum Role {
  USER = 'user',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin'
}

enum Gender {
  MALE = 0,
  FEMALE = 1
}

// buat pastiin key & schema field sama
interface IUser {
  email: string;
  password: string;
  firstname: string;
  lastname?: string;
  gender: number;
  settings: {
    theme: string;
    notification: boolean;
    compactMode: boolean;
  };
  role: Role;
  isActive: boolean;
}

// This is where @types/mongoose shines. Simply create a new interface called IUserDoc that is a extension between our IUser and mongoose's Document types:
// biar ts ngerti mongoose type docs
interface IUserDoc extends IUser, Document {
  fullname: string;
  getGender(): string;
  checkPassword(password: string): Promise<IUserDoc>;
}

// static method
interface IUserModel extends Model<IUserDoc> {
}

export {
  Role,
  Gender,
  IUser,
  IUserDoc,
  IUserModel,
}