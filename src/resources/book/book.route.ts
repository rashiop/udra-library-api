import { Router } from 'express';

import { validateController } from '../../helper';
import { checkPermissionRole, protect } from '../../lib/auth';
import { Role } from '../user';
import bookController from './book.controller';
import validate from './book.validation';

const router = Router();

router
  .route('/')
  .get(bookController.getMany)
  .post(
    validate.saveBook,
    validateController(),
    protect,
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    bookController.createOne
  )

router
  .route('/:id')
  .get(bookController.getOneById)
  .put(
    validate.saveBook,
    validateController(),
    protect,
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    bookController.updateOne
  )
  .delete(
    protect,
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    bookController.removeOne
  )

export default router;