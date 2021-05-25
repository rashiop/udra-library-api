import { Request, Response } from 'express';

import { crudController } from '../../helper';
import { ActiveStatus, getActiveStatus } from '../../helper/activeStatus';
import { commonErrors } from '../../lib/errorManagement';
import { error } from './bookTransaction.constant';
import BookTransaction from './bookTransaction.model';

export const returnBook = async (req: Request, res: Response) => {
  try {
    const userId = req['user']._id
    const transactionId = req.params.id
    const transaction = await BookTransaction.findOne({
      _id: transactionId,
      active_status: ActiveStatus.A
    })
    if (!transaction) {
      throw commonErrors.ResourceNotFoundError({ message: error.transactionNotFound })
    }
    const returnedBook = await transaction.returnBook(userId);
    return res.status(200).json({ data: returnedBook })
  } catch (ex) {
    return res.status(ex.httpCode || 400).json({ message: ex.message || ex.toString() })
  }
}

export const getMyTransaction = async (req: Request, res: Response) => {
  try {
    const userId = req['user']._id
    const activeStatus = getActiveStatus(req.query.active_status)
    const transactions = await BookTransaction.getByUserId(userId, activeStatus)
    return res.status(200).json({ data: transactions })
  } catch (ex) {
    return res.status(ex.httpCode || 400).json({ message: ex.message || ex.toString() })
  }
}

export const getUserTransaction = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    const activeStatus = getActiveStatus(req.query.active_status)
    const transactions = await BookTransaction.getByUserId(userId, activeStatus)
    return res.status(200).json({ data: transactions || [] })
  } catch (ex) {
    return res.status(ex.httpCode || 400).json({ message: ex.message || ex.toString() })
  }
}

export default crudController(BookTransaction)
