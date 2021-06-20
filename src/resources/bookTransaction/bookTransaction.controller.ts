import { Request, Response } from 'express';

import { crudController } from '../../helper';
import DAL from './bookTransaction.DAL';
import BookTransaction from './bookTransaction.model';

const Datasource = new DAL();

export const returnBook = async (req: Request, res: Response) => {
  try {
    const userId = req['user']._id
    const transactionId = req.params.id
    const returnedBook = await Datasource.returnBook(
      transactionId,
      userId
    );
    return res.status(200).json({ data: returnedBook })
  } catch ({ httpCode = 400, message }) {
    return res.status(httpCode).json({ message, error: true })
  }
}

export const getMyTransaction = async (req: Request, res: Response) => {
  try {
    const userId = req['user']._id
    const transactions = await Datasource.getUserTransaction(userId)
    return res.status(200).json({ data: transactions })
  } catch ({ httpCode = 400, message }) {
    return res.status(httpCode).json({ message, error: true })
  }
}

export const getUserTransaction = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    const transactions = await Datasource.getUserTransaction(userId)
    return res.status(200).json({ data: transactions || [] })
  } catch ({ httpCode = 400, message }) {
    return res.status(httpCode).json({ message, error: true })
  }
}

export default crudController(BookTransaction)
