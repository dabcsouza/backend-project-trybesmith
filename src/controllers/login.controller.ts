import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes'; 
import Jwt from 'jsonwebtoken';
import User from '../interfaces/users.interface';
import UserService from '../services/users.service';

export default class LoginController {
  constructor(private userService = new UserService()) { }

  public login = async (req: Request, res: Response) => {
    const jwtSecret = 'MySupersecreT';
    const users: User[] = await this.userService.getAll();
    const { username, password } = req.body;
    if (!users
      .some((user) => (user.username === username && user.password === password))) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Username or password invalid' });
    } 
    const userData = users.find((e) => e.username === username);
    delete userData?.password;
    const token = Jwt.sign(
      { data: userData },
      jwtSecret,
      {
        expiresIn: '7d',
        algorithm: 'HS256',
      },
    );
    return res.status(StatusCodes.OK).json({ token });
  };
}