import express from 'express';
import UserController from '../controllers/userController';
import UserValidation from '../middlewares/userValidation';

const router = express.Router();

// User Routes
router.post(
  '/auth/signup',
  UserValidation.validateRegisterDetails,
  UserValidation.validateExistingUser,
  UserValidation.validateDetails,
  UserController.userRegister,
);

export default router;
