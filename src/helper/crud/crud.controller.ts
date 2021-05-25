import { NextFunction, Request, Response } from 'express';
import { Model } from 'mongoose';

import { commonErrors } from '../../lib/errorManagement';
import { error, success } from './crud.constant';
import DAL, { IDataAccess } from './crud.DAL';


export const getOne = (Datasource: IDataAccess) => async(req: Request, res: Response) => {
  try {
    const data = Datasource.getOne(req.params);
    return res.status(200).json({ data, message: success.fetch });
  } catch(ex) {
    return res.status(ex.httpCode || 400).json({ message: ex.message || ex.toString(), error: true });
  }
}

export const getOneById = (Datasource: IDataAccess) => async(req: Request, res: Response) => {
  try {
    const id = req.params?.id;
    if (id) {
      const data = await Datasource.getOneById(id);
      return res.status(200).json({ data, message: success.fetch });
    }

    throw commonErrors.InvalidInputError({
        message: error.idRequired
      })
  } catch(ex) {
    return res.status(ex.httpCode || 400).json({ message: ex.message || ex.toString(), error: true });
  }
}

export const getMany = (Datasource: IDataAccess) => async(req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await Datasource.getMany(req.query || {});
    return res.status(200).json({ data, message: success.fetch });
  } catch (ex) {
    return next(ex);
  }
};

export const createOne = (Datasource: IDataAccess) => async(req: Request, res: Response) => {
  const creator = req['user']._id;
  try {
    const data = await Datasource.createOne(req.body || {}, creator);
    return res.status(201).json({ data, message: success.create });
  } catch (ex) {
    return res.status(ex.httpCode || 400).json({ message: ex.message || ex.toStirng() }).end();
  }
};

export const updateOne = (Datasource: IDataAccess) => async(req: Request, res: Response) => {
  try {
    const id = req.params?.id
    const updatedDoc = await Datasource.updateOne(id, req.body);

    if (!updatedDoc) {
      throw commonErrors.ResourceNotFoundError({
        message: 'Data did not exist',
      })
    }

    return res.status(200).json({ data: updatedDoc, message: success.update });
  } catch (ex) {
    return res.status(ex.httpCode || 400).json({ message: ex.message || ex.toString(), error: true });
  }
};

export const removeOne = (Datasource: IDataAccess) => async(req: Request, res: Response) => {
  try {
    const id = req.params?.id
    if (id) {
      const removed = await Datasource.removeOne(id);
      return res.status(200).json({ data: removed, message: success.remove });
    }

    throw commonErrors.InvalidInputError({
      message: error.idRequired
    })

  } catch (ex) {
    return res.status(ex.httpCode || 400).json({ message: ex.message || ex.toString(), error: true });
  }
};

export const crudController = (model: Model<any>, options={}) => {
  const Datasource = new DAL(model, options);

  return {
    removeOne: removeOne(Datasource),
    updateOne: updateOne(Datasource),
    getMany: getMany(Datasource),
    getOne: getOne(Datasource),
    getOneById: getOneById(Datasource),
    createOne: createOne(Datasource)
  }
}

export default crudController;