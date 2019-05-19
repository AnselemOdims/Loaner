// import express from 'express';
// import AuthenticateUser from '../middlewares/auth';
// import LoanController from '../controllers/loanController';
// import LoanValidation from '../middlewares/loanValidation';
// import Repayments from '../controllers/repaymentController';
// import RepaymentValidation from '../middlewares/repaymentValidation';

// const {
//   validateInputs,
//   validateQuery,
//   validateLoans,
//   validateId,
//   validateStatus,
// } = LoanValidation;

// const {
//   validateRepayment,
//   validateRecord,
// } = RepaymentValidation;

// const {
//   createLoans,
//   retrieveLoans,
//   getLoan,
//   updateStatus,
// } = LoanController;

// const {
//   createRepayment,
//   getRepayment,
// } = Repayments;

// const {
//   verifyAdmin,
//   verifyUser,
// } = AuthenticateUser;

// const loans = express.Router();

// loans.post(
//   '',
//   verifyUser,
//   validateInputs,
//   createLoans,
// );

// // Route to get all loan applications
// loans.get(
//   '',
//   verifyAdmin,
//   validateQuery,
//   validateLoans,
//   retrieveLoans,
// );

// // Route to get a single loan application
// loans.get(
//   '/:id',
//   verifyAdmin,
//   validateId,
//   getLoan,
// );

// // Route to approve or reject a client's loan application
// loans.patch(
//   '/:id',
//   verifyAdmin,
//   validateId,
//   validateStatus,
//   updateStatus,
// );

// // Route to create a loan repayment record
// loans.post(
//   '/:id/repayment',
//   verifyAdmin,
//   validateId,
//   validateRepayment,
//   createRepayment,
// );

// // Route to get repayment history
// loans.get(
//   '/:id/repayments',
//   verifyUser,
//   validateId,
//   validateRecord,
//   getRepayment,
// );

// export { loans };
