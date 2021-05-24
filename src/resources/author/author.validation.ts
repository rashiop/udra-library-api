import { body } from 'express-validator/check';

import { error } from './author.constant';

const saveAuthor = [
  body('first_name', error.firstNameRequired).exists(),
  body('last_name', error.lastNameRequired).exists(),
]



export default {
  saveAuthor
}
