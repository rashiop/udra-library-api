import { Router } from 'express';

import { validateController } from '../../helper';
import { checkPermissionRole } from '../../lib/auth';
import { Role } from '../user';
import bookController, { getMany, getOneById } from './book.controller';
import validate from './book.validation';

const router = Router();

router
  .route('/')
  .get(getMany)
  .post(
    validate.saveBook,
    validateController(),
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    bookController.createOne
  )

router
  .route('/:id')
  .get(getOneById)
  .patch(
    validate.saveBook,
    validateController(),
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    bookController.updateOne
  )
  .delete(
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    bookController.removeOne
  )

export default router;