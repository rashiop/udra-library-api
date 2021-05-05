import { Request, Response } from 'express';

import { crudControllers } from '../../lib/crud';
import Book from './book.model';

export const getOneById = async(req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const book = await Book.getOneById(bookId)
    return res.status(200).json({ data: book })
  } catch(ex) {
    return res
      .status(ex.httpCode || 400)
      .json({ error: ex.message || ex.toString() })
  }
}

export const getMany = async(_: Request, res: Response) => {
  try {
    const books = await Book.getMany();
    return res.status(200).json({ data: books })
  } catch(ex) {
    return res
      .status(ex.httpCode || 400)
      .json({ error: ex.message || ex.toString() })
  }
}

export default crudControllers(Book)
