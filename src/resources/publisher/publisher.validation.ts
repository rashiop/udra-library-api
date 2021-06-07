import { body } from 'express-validator';

import { error } from './publisher.constant';

const savePublisher = [
  body('name', error.nameRequired).exists(),
]



export default {
  savePublisher
}
