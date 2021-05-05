import { Router } from 'express';

import { checkPermissionRole } from '../../lib/auth';
import { Role } from '../user';
import fineController, { deactiveFine, getCurrentFine } from './fine.controller';

const router = Router();

router
  .route('/')
  .get(getCurrentFine)
  .post(
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    fineController.createOne
  )

router
  .route('/:id')
  .get(fineController.getOneById)
  .patch(
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    fineController.updateOne
  )
  .delete(
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    deactiveFine
  )

export default router;