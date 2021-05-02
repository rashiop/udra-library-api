import { Router } from 'express';

import { checkPermission } from '../../lib/auth';
import { Role } from '../user';
import genreController from './genre.controller';

const router = Router();

router
  .route('/')
  .get(genreController.getMany)
  .post(
    checkPermission(Role.ADMIN, Role.SUPER_ADMIN),
    genreController.createOne
  )

router
  .route('/:id')
  .get(genreController.getOneById)
  .patch(
    checkPermission(Role.ADMIN, Role.SUPER_ADMIN),
    genreController.updateOne
  )
  .delete(
    checkPermission(Role.ADMIN, Role.SUPER_ADMIN),
    genreController.removeOne
  )

export default router;