import { body } from 'express-validator/check';

import { error } from './auth.constant';

const signup = [
  body('email', error.incompleteData).exists(),
  body('password', error.incompleteData).exists(),
  body('firstname', error.incompleteData).exists(),
  body('gender', error.incompleteData).exists(),
]

const signin = [
  body('email', error.incompleteData).exists(),
  body('password', error.incompleteData).exists(),
]

export default {
  signup,
  signin
}