import { Router } from 'express';

import { validateController } from '../../helper';
import { checkPermissionLoginUser, checkPermissionRole } from '../../lib/auth';
import { Role } from '../user';
import bookTransactionController, { getMyTransaction, returnBook } from './bookTransaction.controller';
import validate from './bookTransaction.validation';

const router = Router();

router
  .route('/')
  .get(
    checkPermissionLoginUser(Role.ADMIN, Role.SUPER_ADMIN),
    bookTransactionController.getMany
  )
  .post(
    validate.saveBookTransaction,
    validateController(),
    bookTransactionController.createOne
  )

router
  .route('/return/:id')
  .patch(
    validate.saveBookTransaction,
    validateController(),
    checkPermissionLoginUser(Role.ADMIN, Role.SUPER_ADMIN),
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
    checkPermissionLoginUser(Role.ADMIN, Role.SUPER_ADMIN),
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