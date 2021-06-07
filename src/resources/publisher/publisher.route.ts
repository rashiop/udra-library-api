import { Router } from 'express';

import { validateController } from '../../helper';
import { checkPermissionRole, protect } from '../../lib/auth';
import { Role } from '../user';
import publisherController from './publisher.controller';
import validate from './publisher.validation';

const router = Router();

router
  .route('/')
  .get(publisherController.getMany)
  .post(
    validate.savePublisher,
    validateController(),
    protect,
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    publisherController.createOne
  )

router
  .route('/:id')
  .get(publisherController.getOneById)
  .put(
    validate.savePublisher,
    validateController(),
    protect,
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    publisherController.updateOne
  )
  .delete(
    protect,
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    publisherController.removeOne
  )

export default router;