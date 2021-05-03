import { Request, Response } from 'express';

import { crudControllers } from '../../lib/crud';
import { commonErrors } from '../../lib/errorManagement';
import { error } from './bookTransaction.constant';
import BookTransaction from './bookTransaction.model';

export const returnBook = async (req: Request, res: Response) => {
  const userId = req['user']._id
  const transactionId = req.params.id
  try {
    const transaction = await BookTransaction.findById(transactionId)
    if (!transaction) {
      throw commonErrors.ResourceNotFoundError({ message: error.transactionNotFound })
    }
    const returnedBook = await transaction.returnBook(userId);
    return res.status(200).json({ data: returnedBook })
    
  } catch(ex) {
    return res.status(ex.httpCode || 400).json({ message: ex.message || ex.toString() })
  }
}

export const getMyTransaction = async(req: Request, res: Response) => {
  try {
    const userId = req['user']._id
    const transactions = await BookTransaction.find({
      user: userId,
      is_active: Boolean(req.query.isActive)
    })
    return res.status(200).json({ data: transactions || [] })
  } catch(ex) {
    return res.status(ex.httpCode || 400).json({ message: ex.message || ex.toString() })
  }
}

export const getUserTransaction = async(req: Request, res: Response) => {
  try {
    const transactions = await BookTransaction.find({
      user: req.params.userId,
      is_active: Boolean(req.query.isActive)
    })
    return res.status(200).json({ data: transactions || [] })
  } catch(ex) {
    return res.status(ex.httpCode || 400).json({ message: ex.message || ex.toString() })
  }
}

export default crudControllers(BookTransaction)
