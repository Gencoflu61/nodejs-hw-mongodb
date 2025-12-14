import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerController,
  loginController,
  refreshController,
  logoutController
} from '../controllers/auth.js';

const router = express.Router();

router.post('/register', ctrlWrapper(registerController));
router.post('/login', ctrlWrapper(loginController));
router.post('/refresh', ctrlWrapper(refreshController));
router.post('/logout', ctrlWrapper(logoutController));

export default router;