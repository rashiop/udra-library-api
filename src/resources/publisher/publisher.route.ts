import { Router } from 'express';

import { checkPermissionRole } from '../../lib/auth';
import { Role } from '../user';
import publisherController from './publisher.controller';

const router = Router();

router
  .route('/')
  .get(publisherController.getMany)
  .post(
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    publisherController.createOne
  )

router
  .route('/:id')
  .get(publisherController.getOneById)
  .put(
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    publisherController.updateOne
  )
  .delete(
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    publisherController.removeOne
  )

export default router;