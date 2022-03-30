import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes'; 
import OrderService from '../services/orders.service';

export default class OrdersController {
  constructor(private orderService = new OrderService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.orderService.getAll();
    const response = orders.map((el) => ({ ...el, products: [el.products] }));
    res.status(StatusCodes.OK).json(response);
  };

  public create = async (req: Request, res: Response) => {
    const order = req.body;

    const orderCreated = await this.orderService.create(order);
    res.status(StatusCodes.CREATED).json(orderCreated);
  };
}