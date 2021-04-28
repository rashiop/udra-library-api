import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';

import { commonErrors } from './errorManagement';

export const getOne = (model: Model<any>) => async(req: Request, res: Response) => {
  try {
    const data = await model.findOne(req.params).lean().exec();
    return res.status(200).json({ data });
  } catch(ex) {
    return res.status(400).json({ message: ex.name });
  }
}

export const getOneById = (model: Model<any>) => async(req: Request, res: Response) => {
  try {
    const data = await model.findById(req.params?.id).lean().exec();
    return res.status(200).json({ data });
  } catch(ex) {
    return res.status(400).json({ message: ex.name });
  }
}

export const getMany = (model: Model<any>) => async(req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await model
      .find(req.query || {})
      .lean()
      .exec();

    if (data == null || data.length == 0) {
      throw commonErrors.ResourceNotFoundError({
        message: 'Data did not exist',
      })
    }
    
    return res.status(200).json({ data });
  } catch (ex) {
    return next(ex);
  }
};

export const createOne = (model: Model<any>) => async(req: Request, res: Response) => {
  const createdBy = 'req?.user?._id';
  try {
    const data = await model.create({ ...req.body, createdBy });
    return res.status(201).json({ data });
  } catch (ex) {
    return res.status(400).json({ message: ex.name });
  }
};

export const updateOne = (model: Model<any>) => async(req: Request, res: Response) => {
  try {
    const updatedDoc = await model
      .findOneAndUpdate(
        {
          // createdBy: '',
          // createdBy: (req.user || {})._id,
          _id: req.params?.id
        },
        req.body,
        { new: true }
      )
      .lean()
      .exec();

    if (!updatedDoc) {
      throw commonErrors.ResourceNotFoundError({
        message: 'Data did not exist',
      })
    }

    return res.status(200).json({ data: updatedDoc });
  } catch (ex) {
    return res.status(400).json({ message: ex.name });
  }
};

export const removeOne = (model: Model<any>) => async(req: Request, res: Response) => {
  try {
    const removed = await model.findOneAndRemove({
      // createdBy: '',
      // createdBy: (req.user || {})._id,
      _id: (req.params || {}).id
    });

    if (!removed) {
      return res.status(400).end();
    }

    return res.status(200).json({ data: removed });
  } catch (ex) {
    return res.status(400).json({ message: ex.name });
  }
};

export const crudControllers = (model: Model<any>) => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  getOneById: getOneById(model),
  createOne: createOne(model)
})