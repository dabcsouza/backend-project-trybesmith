import express from 'express';
import ProductsController from '../controllers/products.controller';
import { validateProductAmount, validateProductName } from '../middlewares/validateProductBody';

const productsRouter = express.Router();
const productsController = new ProductsController();

productsRouter.get('/products', productsController.getAll);
productsRouter.post(
  '/products',
  validateProductName,
  validateProductAmount,
  productsController.create,
);
export default productsRouter;