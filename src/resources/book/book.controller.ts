import { Request, Response } from 'express';

import { crudController } from '../../helper';
import Book from './book.model';

export const getOneById = async(req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const book = await Book.getOneById(bookId)
    return res.status(200).json({ data: book })
  } catch({ httpCode = 400, message }) {
    return res
      .status(httpCode)
      .json({ message, error: true })
  }
}

export const getMany = async(_: Request, res: Response) => {
  try {
    const books = await Book.getMany();
    return res.status(200).json({ data: books })
  } catch({ httpCode = 400, message }) {
    return res
      .status(httpCode)
      .json({ message, error: true })
  }
}

export default crudController(Book)
