import { IUserDoc } from '../resources/user/user.type';

declare module Express {
  export interface Request {
    user?: IUserDoc
  }
}
