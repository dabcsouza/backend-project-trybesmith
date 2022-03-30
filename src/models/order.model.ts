import { Pool, ResultSetHeader } from 'mysql2/promise';
import Order, { OrderGetAllResponse } from '../interfaces/orders.interface';

export default class OrderModel {
  public connection: Pool;
  
  constructor(connection: Pool) {
    this.connection = connection;
  }

  public getAll = async (): Promise<OrderGetAllResponse[]> => {
    const query = `SELECT t1.id id, userId, t2.id products
    FROM  Trybesmith.Orders t1
    LEFT JOIN Trybesmith.Products t2
    ON t1.id = t2.orderId;`;
    const response = await this
      .connection.execute(query);
    const [rows] = response;
    return rows as OrderGetAllResponse[];
  };

  public create = async (order: Order): Promise<Order> => {
    const { userId } = order; 
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders(name, amount, orderId) VALUES (?)',
      [userId],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return {
      id: insertId,
      ...order, 
    };
  };
}