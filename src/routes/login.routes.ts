import express from 'express';
import LoginController from '../controllers/login.controller';
import { validateUsername, validatePassword } from '../middlewares/validateUserBody';

const loginRouter = express.Router();
const loginController = new LoginController();

loginRouter.post(
  '/login',
  validateUsername,
  validatePassword,
  loginController.login,
);
export default loginRouter;