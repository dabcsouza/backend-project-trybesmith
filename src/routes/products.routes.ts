import express from 'express';
import ProductsController from '../controllers/products.controller';

const productsRouter = express.Router();
const productsController = new ProductsController();
productsRouter.get('/products', productsController.getAll);

export default productsRouter;