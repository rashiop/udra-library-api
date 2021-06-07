import { body } from 'express-validator';

import { error } from './fine.constant';

const saveFine = [
  body('amount', error.amountRequired).exists(),
]



export default {
  saveFine
}
