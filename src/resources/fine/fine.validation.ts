import { body } from 'express-validator/check';

import { error } from './fine.constant';

const saveFine = [
  body('amount', error.amountRequired).exists(),
]



export default {
  saveFine
}
