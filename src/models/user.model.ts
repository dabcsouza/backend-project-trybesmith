import { Pool, ResultSetHeader } from 'mysql2/promise';
import User, { UserApiResponse } from '../interfaces/users.interface';

export default class UserModel {
  public connection: Pool;
  
  constructor(connection: Pool) {
    this.connection = connection;
  }

  public getAll = async (): Promise<User[]> => {
    const response = await this.connection
      .execute('SELECT id, username, classe, level, password FROM Trybesmith.Users');
    const [rows] = response;
    return rows as User[];
  };

  public create = async (user: User): Promise<UserApiResponse> => {
    const { username, classe, level, password } = user;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users(username, classe, level, password) VALUES (?, ?, ?, ?)',
      [username, classe, level, password],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    console.log(insertId);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'
    + 'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ'
    + 'SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    return { token };
  };
}