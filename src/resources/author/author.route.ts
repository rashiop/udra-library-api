import { Router } from 'express';

import { checkPermissionRole } from '../../lib/auth';
import { Role } from '../user';
import authorController from './author.controller';

const router = Router();

router
  .route('/')
  .get(authorController.getMany)
  .post(
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    authorController.createOne
  )

router
  .route('/:id')
  .get(authorController.getOneById)
  .put(
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    authorController.updateOne
  )
  .delete(
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    authorController.removeOne
  )

export default router;