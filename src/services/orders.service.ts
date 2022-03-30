import connection from '../models/connection';
import OrderModel from '../models/order.model';
import Order, { OrderGetAllResponse } from '../interfaces/orders.interface';

export default class OrderService {
  public model: OrderModel;

  constructor() {
    this.model = new OrderModel(connection);
  }

  public getAll = async (): Promise<OrderGetAllResponse[]> => {
    const Orders = await this.model.getAll();
    return Orders;
  };

  public create = async (order: Order): Promise<Order> => this
    .model.create(order);
}