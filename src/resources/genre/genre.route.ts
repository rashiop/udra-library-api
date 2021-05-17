import { Router } from 'express';

import { checkPermissionRole } from '../../lib/auth';
import { Role } from '../user';
import genreController from './genre.controller';

const router = Router();

router
  .route('/')
  .get(genreController.getMany)
  .post(
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    genreController.createOne
  )

router
  .route('/:id')
  .get(genreController.getOneById)
  .put(
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    genreController.updateOne
  )
  .delete(
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    genreController.removeOne
  )

export default router;