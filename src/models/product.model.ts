import { Pool, ResultSetHeader } from 'mysql2/promise';
import Product from '../interfaces/products.interface';

export default class ProductModel {
  public connection: Pool;
  
  constructor(connection: Pool) {
    this.connection = connection;
  }

  public getAll = async (): Promise<Product[]> => {
    const response = await this
      .connection.execute('SELECT id, name, amount, orderId FROM Trybesmith.Products');
    const [rows] = response;
    return rows as Product[];
  };

  public create = async (product: Product): Promise<Product> => {
    const { name, amount } = product;
    const orderId = product.orderId ? product.orderId : null;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products(name, amount, orderId) VALUES (?, ?, ?)',
      [name, amount, orderId],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...product };
  };
}