import express from 'express';
import UserController from '../controllers/userController';
import UserValidation from '../middlewares/userValidation';
import AuthenticateUser from '../middlewares/auth';
import LoanController from '../controllers/loanController';
import LoanValidation from '../middlewares/loanValidation';
import Repayments from '../controllers/repaymentController';
import RepaymentValidation from '../middlewares/repaymentValidation';

const router = express.Router();

// Version Home Route
router.get('/', (req, res) => {
  res.status(200).send({ status: 200, message: 'Welcome to Loaner API Version 1'})
})

// Route to create a new User
router.post(
  '/auth/signup',
  UserValidation.validateRegisterDetails,
  UserValidation.validateExistingUser,
  UserValidation.validateDetails,
  UserController.userRegister,
);

// Route to sign an already existing User in
router.post(
  '/auth/login',
  UserValidation.validateDetails,
  UserValidation.validateLogin,
  UserController.userLogin,
);

// Route to verify a User 
router.patch(
  '/:email/verify',
  AuthenticateUser.verifyAdmin,
  UserValidation.validateStatus,
  UserController.verifyUser,
);

// Route to get all Users
router.get('/users', AuthenticateUser.verifyAdmin, UserController.getUsers);

// Route to create a new loan application
router.post(
  '/loans',
  AuthenticateUser.verifyUser,
  LoanValidation.validateInputs,
  LoanController.createLoans,
);

// Route to get all loan applications
router.get(
  '/loans',
  AuthenticateUser.verifyAdmin, 
  LoanValidation.validateQuery, 
  LoanValidation.validateLoans, 
  LoanController.retrieveLoans,
);

// Route to get a single loan application
router.get(
  '/loans/:id',
  AuthenticateUser.verifyAdmin,
  LoanValidation.validateId,
  LoanController.getLoan,
);

// Route to approve or reject a client's loan application
router.patch(
  '/loans/:id',
  AuthenticateUser.verifyAdmin,
  LoanValidation.validateId,
  LoanValidation.validateStatus,
  LoanController.updateStatus,
);

// Route to create a loan repayment record
router.post(
  '/loans/:id/repayment',
  AuthenticateUser.verifyAdmin,
  LoanValidation.validateId,
  RepaymentValidation.validateRepayment, 
  Repayments.createRepayment,
);

// Route to get repayment history
router.get(
  '/loans/:id/repayments', 
  AuthenticateUser.verifyUser,
  LoanValidation.validateId,
  RepaymentValidation.validateRecord, 
  Repayments.getRepayment,
);
export default router;
