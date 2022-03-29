import connection from '../models/connection';
import ProductModel from '../models/product.model';
import Product, { ResponseProduct } from '../interfaces/products.interface';

export default class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public getAll = async (): Promise<Product[]> => {
    const Products = await this.model.getAll();
    return Products;
  };

  public create = async (product: Product): Promise<ResponseProduct> => this
    .model.create(product);
}