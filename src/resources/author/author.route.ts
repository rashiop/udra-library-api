import { Router } from 'express';

import validateController from '../../helper/validate';
import { checkPermissionRole } from '../../lib/auth';
import { Role } from '../user';
import authorController from './author.controller';
import validate from './author.validation';

const router = Router();

router
  .route('/')
  .get(authorController.getMany)
  .post(
    validate.saveAuthor,
    validateController(),
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    authorController.createOne
  )

router
  .route('/:id')
  .get(authorController.getOneById)
  .put(
    validate.saveAuthor,
    validateController(),
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    authorController.updateOne
  )
  .delete(
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    authorController.removeOne
  )

export default router;