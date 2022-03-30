import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import Jwt from 'jsonwebtoken';
import User from '../interfaces/users.interface';
import UserService from '../services/users.service';

const jwtSecret = 'MySupersecreT';
const userService = new UserService();

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Token not found' }); 
  }
  
  try {
    const resolved = Jwt.verify(token, jwtSecret) as { data: User, iat: number, exp: number };
    const dataToken = resolved.data;
    const users = await userService.getAll();
    const user = users.find((userEl) => userEl.username === dataToken.username);
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED).json({ error: 'unauthorized user token' });
    }
    return next();
  } catch (e: any) {
    console.log(e.message);
  }
};