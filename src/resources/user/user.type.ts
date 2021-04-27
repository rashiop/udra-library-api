import { Document } from 'mongoose';

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
interface IUserBase {
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

// biar ts ngerti mongoose type docs
interface IUserBaseDoc extends IUserBase, Document {
  fullname: string;
  getGender(): string;
}

type IUser = IUserBaseDoc

export {
  Role,
  Gender,
  IUserBase,
  IUserBaseDoc,
  IUser
}