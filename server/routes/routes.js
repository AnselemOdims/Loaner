import express from 'express';
import UserController from '../controllers/userController';
import UserValidation from '../middlewares/userValidation';
import AuthenticateUser from '../middlewares/auth';
import LoanController from '../controllers/loanController';
import LoanValidation from '../middlewares/loanValidation';

const router = express.Router();

// User Routes
router.post(
  '/auth/signup',
  UserValidation.validateRegisterDetails,
  UserValidation.validateExistingUser,
  UserValidation.validateDetails,
  UserController.userRegister,
);
router.post(
  '/auth/login',
  UserValidation.validateDetails,
  UserValidation.validateLogin,
  UserController.userLogin,
);
router.patch(
  '/:email/verify',
  AuthenticateUser.verifyAdmin,
  UserValidation.validateStatus,
  UserController.verifyUser,
);
router.get('/users', AuthenticateUser.verifyAdmin, UserController.getUsers);

// Loan Routes
router.post(
  '/loans',
  AuthenticateUser.verifyUser,
  LoanValidation.validateInputs,
  LoanController.createLoans,
);
export default router;
