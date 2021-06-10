import { body } from 'express-validator';

import { error } from './genre.constant';

const saveGenre = [
  body('name', error.nameRequired).exists(),
]

export default {
  saveGenre
}
