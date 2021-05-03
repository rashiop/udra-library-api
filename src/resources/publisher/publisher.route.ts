import { Router } from 'express';

import { checkPermission } from '../../lib/auth';
import { Role } from '../user';
import publisherController from './publisher.controller';

const router = Router();

router
  .route('/')
  .get(publisherController.getMany)
  .post(
    checkPermission(Role.ADMIN, Role.SUPER_ADMIN),
    publisherController.createOne
  )

router
  .route('/:id')
  .get(publisherController.getOneById)
  .patch(
    checkPermission(Role.ADMIN, Role.SUPER_ADMIN),
    publisherController.updateOne
  )
  .delete(
    checkPermission(Role.ADMIN, Role.SUPER_ADMIN),
    publisherController.removeOne
  )

export default router;