import { Router } from 'express';

import controller, { getManyUser, getUser, me } from './user.controller';

const router = Router();


router
.route('/')
.get(getManyUser)
.post(controller.createOne)

router
  .route('/me')
  .get(me);

router
  .route('/:id')
  .get(getUser)
  .patch(controller.updateOne)
  .delete(controller.removeOne)

export default router;