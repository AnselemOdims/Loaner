import express from 'express';
import UserValidation from '../middlewares/userValidation';
import UserController from '../controllers/userController';
import AuthenticateUser from '../middlewares/auth';

const {
  validateRegisterDetails,
  validateExistingUser,
  validateDetails,
  validateLogin,
  validateStatus,
  validateId,
  validateUser,
} = UserValidation;

const {
  userRegister,
  userLogin,
  verifyUser,
  getUsers,
  getAUser,
  deleteAUser,
} = UserController;

const { verifyAdmin } = AuthenticateUser;

const auth = express.Router();
const users = express.Router();

auth.post(
  '/signup',
  validateRegisterDetails,
  validateExistingUser,
  validateDetails,
  userRegister,
);

auth.post(
  '/login',
  validateDetails,
  validateLogin,
  userLogin,
);

users.patch(
  '/:email/verify',
  verifyAdmin,
  validateUser,
  validateStatus,
  verifyUser,
);

users.get('', verifyAdmin, getUsers);

users.get(
  '/:id',
  verifyAdmin,
  validateId,
  getAUser,
);

users.delete(
  '/:email/delete',
  verifyAdmin,
  validateUser,
  deleteAUser,
);

export { auth, users };
