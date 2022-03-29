import connection from '../models/connection';
import UserModel from '../models/user.model';
import User, { UserApiResponse } from '../interfaces/users.interface';

export default class ProductService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public create = async (user: User): Promise<UserApiResponse> => this
    .model.create(user);
}