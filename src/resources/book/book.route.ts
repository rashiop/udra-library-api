import { Router } from 'express';

import { checkPermissionRole } from '../../lib/auth';
import { Role } from '../user';
import bookController from './book.controller';

const router = Router();

router
  .route('/')
  .get(bookController.getMany)
  .post(
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    bookController.createOne
  )

router
  .route('/:id')
  .get(bookController.getOneById)
  .patch(
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    bookController.updateOne
  )
  .delete(
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    bookController.removeOne
  )

export default router;