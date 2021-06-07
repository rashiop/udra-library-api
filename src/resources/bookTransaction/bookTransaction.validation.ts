import { body } from 'express-validator';

import { error } from './bookTransaction.constant';

const saveBookTransaction = [
  body('book', error.bookRequired).exists(),
]



export default {
  saveBookTransaction
}
