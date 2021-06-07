import { Router } from 'express';

import { validateController } from '../../helper';
import authController from './auth.controller';
import validate from './auth.validation';

const router = Router();

router
  .route('/signup')
  .post(authController.signup)
  .post(
    validate.signup,
    validateController(),
    authController.signup
  );

router
  .route('/signin')
  .post(authController.signin)
  .post(
    validate.signin,
    validateController(),
    authController.signin
  );
  
export default router;