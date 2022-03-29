import express from 'express';
import UsersController from '../controllers/users.controller';
import * as validateRoute from '../middlewares/validateUserBody';

const userRouter = express.Router();
const usersController = new UsersController();

userRouter.post(
  '/users',
  validateRoute.validateUsername,
  validateRoute.validateClasse,
  validateRoute.validateLevel,
  validateRoute.validatePassword,
  usersController.create,
);

export default userRouter;