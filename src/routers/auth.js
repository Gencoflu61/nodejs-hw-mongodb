import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

// BASİT CONTROLLER'lar (şimdilik)
const registerController = async (req, res) => {
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: { name: req.body.name, email: req.body.email }
  });
};

const loginController = async (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken: 'test_token_123' }
  });
};

const router = express.Router();

router.post('/register', ctrlWrapper(registerController));
router.post('/login', ctrlWrapper(loginController));

export default router;