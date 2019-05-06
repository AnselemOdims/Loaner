import express from 'express';
import UserController from '../controllers/userController';
import UserValidation from '../middlewares/userValidation';
import AuthenticateUser from '../middlewares/auth';
import LoanController from '../controllers/loanController';
import LoanValidation from '../middlewares/loanValidation';
import Repayments from '../controllers/repaymentController';
import RepaymentValidation from '../middlewares/repaymentValidation';

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

router.get(
  '/loans',
  AuthenticateUser.verifyAdmin, 
  LoanValidation.validateQuery, 
  LoanValidation.validateLoans, 
  LoanController.retrieveLoans
);
router.get(
  '/loans/:id',
  AuthenticateUser.verifyAdmin,
  LoanValidation.validateId,
  LoanController.getLoan,
);
router.patch(
  '/loans/:id',
  AuthenticateUser.verifyAdmin,
  LoanValidation.validateId,
  LoanValidation.validateStatus,
  LoanController.updateStatus,
);
router.put(
  '/loans/:id',
  AuthenticateUser.verifyAdmin,
  LoanValidation.validateId,
  LoanValidation.validateRepaid,
  LoanController.updatePayment,
);
router.post(
  '/loans/:id/repayment',
  AuthenticateUser.verifyAdmin,
  LoanValidation.validateId,
  RepaymentValidation.validateRepayment, 
  Repayments.createRepayment,
);
router.get(
  '/loans/:id/repayments', 
  AuthenticateUser.verifyUser,
  LoanValidation.validateId,
  RepaymentValidation.validateRecord, 
  Repayments.getRepayment,
);
export default router;
