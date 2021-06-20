import { Request, Response } from 'express';

import { crudController } from '../../helper';
import DAL from './user.DAL';
import User from './user.model';


const Datasource = new DAL();

export const me = (req: Request, res: Response) => {
  res.status(200).json({ data: req['user'] });
}

export const getManyUser = async(_: Request, res: Response) => {
  try {
    const users = await Datasource.getManyUser();
    return res.status(200).json({ data: users || [] })
  } catch({ httpCode, message }) {
    return res.status(httpCode).json({ message, error: true })
  }
}

export const getUser = async(req: Request, res: Response) => {
  try {
    const user = await Datasource.getUser(req.params.id);
    return res.status(200).json({ data: user || [] })
  } catch({ httpCode, message }) {
    return res.status(httpCode).json({ message, error: true })
  }
}

export default crudController(User)
