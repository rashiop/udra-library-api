import { body } from 'express-validator/check';

import { error } from './book.constant';

const saveBook = [
  body('title', error.titleRequired).exists(),
  body('authors', error.authorRequired).exists(),
  body('genre', error.genreRequired).exists(),
  body('publisher', error.publisherRequired).exists(),
]



export default {
  saveBook
}
