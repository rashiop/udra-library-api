import { Request, Response } from 'express';

import { crudController } from '../../helper';
import DAL from './fine.DAL';
import Fine from './fine.model';

const Datasource = new DAL();

export const getCurrentFine = async (_: Request, res: Response) => {
  try {
    const fine = await Datasource.getCurrentFine();
    return res.status(200).json({ data: fine })
  } catch({ httpCode = 400, message }) {
    return res.status(httpCode).json({ message, error: true })
  }
};

export const deactiveFine = async (req: Request, res: Response) => {
  try {
    const fineAmout = await Datasource.deactiveFine(req.params.id);
    return res.status(200).json({ data: fineAmout || 0 })
  } catch({ httpCode = 400, message }) {
    return res.status(httpCode).json({ message, error: true })
  }
};

export default crudController(Fine);
