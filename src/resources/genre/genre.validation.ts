import { body } from 'express-validator/check';

import { error } from './genre.constant';

const saveGenre = [
  body('name', error.nameRequired).exists(),
]



export default {
  saveGenre
}
