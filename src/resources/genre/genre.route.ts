import { Router } from 'express';

import validateController from '../../helper/validate';
import { checkPermissionRole } from '../../lib/auth';
import { Role } from '../user';
import genreController from './genre.controller';
import validate from './genre.validation';

const router = Router();

router
  .route('/')
  .get(genreController.getMany)
  .post(
    validate.saveGenre,
    validateController(),
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    genreController.createOne
  )

router
  .route('/:id')
  .get(genreController.getOneById)
  .put(
    validate.saveGenre,
    validateController(),
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    genreController.updateOne
  )
  .delete(
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    genreController.removeOne
  )

export default router;