import { Router } from 'express';

import { checkPermission } from '../../lib/auth';
import { Role } from '../user';
import authorController from './author.controller';

const router = Router();

router
  .route('/')
  .get(authorController.getMany)
  .post(
    checkPermission(Role.ADMIN, Role.SUPER_ADMIN),
    authorController.createOne
  )

router
  .route('/:id')
  .get(authorController.getOneById)
  .patch(
    checkPermission(Role.ADMIN, Role.SUPER_ADMIN),
    authorController.updateOne
  )
  .delete(
    checkPermission(Role.ADMIN, Role.SUPER_ADMIN),
    authorController.removeOne
  )

export default router;