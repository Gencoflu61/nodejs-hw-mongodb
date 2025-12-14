import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerController,
  loginController,
  refreshController,
  logoutController
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authSchema } from '../schemas/authSchemas.js';

const router = express.Router();


router.post('/register', validateBody(authSchema.register), ctrlWrapper(registerController));


router.post('/login', validateBody(authSchema.login), ctrlWrapper(loginController));


router.post('/refresh', ctrlWrapper(refreshController));


router.post('/logout', ctrlWrapper(logoutController));

export default router;