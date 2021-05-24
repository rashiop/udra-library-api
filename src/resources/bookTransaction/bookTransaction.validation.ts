import { body } from 'express-validator/check';

import { error } from './bookTransaction.constant';

const saveBookTransaction = [
  body('book', error.bookRequired).exists(),
]



export default {
  saveBookTransaction
}
