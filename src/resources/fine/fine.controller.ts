import { Request, Response } from 'express';

import { ActiveStatus, crudController } from '../../helper';
import { commonErrors } from '../../lib/errorManagement';
import { error } from './fine.constant';
import Fine from './fine.model';

export const getCurrentFine = async (_: Request, res: Response) => {
  try {
    const fine = await Fine.getLatestFine();
    return res.status(200).json({ data: fine })
  } catch({ httpCode = 400, message }) {
    return res.status(httpCode).json({ message, error: true })
  }
};

export const deactiveFine = async (req: Request, res: Response) => {
  try {
    const fine = await Fine.findByIdAndUpdate(
      req.params.id,
      {
        active_status: ActiveStatus.D
      },
      { new: true, runValidators: true }
    ).lean().exec();

    if (fine == null) {
      throw commonErrors.ResourceNotFoundError({
        message: error.fineNotFound
      })
    }

    return res.status(200).json({ data: fine.amount || 0 })
  } catch({ httpCode = 400, message }) {
    return res.status(httpCode).json({ message, error: true })
  }
};

export default crudController(Fine);
