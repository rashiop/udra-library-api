import { IUserDoc } from '../resources/user';

declare module Express {
  export interface Request {
    user?: IUserDoc
  }
}
