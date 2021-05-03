import { Router } from 'express';

import { checkPermissionLogedInUser, checkPermissionRole } from '../../lib/auth';
import { Role } from '../user';
import bookTransactionController, { getMyTransaction, returnBook } from './bookTransaction.controller';

const router = Router();

router
  .route('/')
  .get(
    checkPermissionLogedInUser(Role.ADMIN, Role.SUPER_ADMIN),
    bookTransactionController.getMany
  )
  .post(bookTransactionController.createOne)

router
  .route('/returnBook/:id')
  .post(
    checkPermissionLogedInUser(Role.ADMIN, Role.SUPER_ADMIN),
    returnBook
  )

router
  .route('/me')
  .get(getMyTransaction)

router
  .route('/user/:id')
  .get(
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    getMyTransaction
  )
  
router
  .route('/:id')
  .get(
    checkPermissionLogedInUser(Role.ADMIN, Role.SUPER_ADMIN),
    bookTransactionController.getOneById
  )
  .patch(
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    bookTransactionController.updateOne
  )
  .delete(
    checkPermissionRole(Role.ADMIN, Role.SUPER_ADMIN),
    bookTransactionController.removeOne
  )

export default router;