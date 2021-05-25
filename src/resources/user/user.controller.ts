import { Request, Response } from 'express';

import { crudController } from '../../helper';
import User from './user.model';

export const me = (req: Request, res: Response) => {
  res.status(200).json({ data: req['user'] });
}

export const getManyUser = async(_: Request, res: Response) => {
  try {
    const users = await User.find().select('-password').lean().exec()
    return res.status(200).json({ data: users || [] })
  } catch(ex) {
    return res.status(ex.httpCode || 400).json({ message: ex.message || ex.toString() })
  }
}

export const getUser = async(req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password').lean().exec()
    return res.status(200).json({ data: user || [] })
  } catch(ex) {
    return res.status(ex.httpCode || 400).json({ message: ex.message || ex.toString() })
  }
}

export default crudController(User)
