import { body } from 'express-validator/check';

import { error } from './publisher.constant';

const savePublisher = [
  body('name', error.nameRequired).exists(),
]



export default {
  savePublisher
}
