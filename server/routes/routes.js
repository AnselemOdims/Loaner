import express from 'express';
import { auth, users } from './userRoute';
import { loans } from './loanRoute';

const router = express.Router();

// Version Home Route
router.get('/', (req, res) => {
  res.status(200).send({ status: 200, message: 'Welcome to Loaner API Version 1' });
});

router.use('/auth', auth);
router.use('/users', users);
router.use('/loans', loans);

export default router;
