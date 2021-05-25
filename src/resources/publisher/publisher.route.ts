import { Router } from 'express';

import { validateController } from '../../helper';
import { checkPermissionRole } from '../../lib/auth';
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
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    publisherController.createOne
  )

router
  .route('/:id')
  .get(publisherController.getOneById)
  .put(
    validate.savePublisher,
    validateController(),
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    publisherController.updateOne
  )
  .delete(
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    publisherController.removeOne
  )

export default router;