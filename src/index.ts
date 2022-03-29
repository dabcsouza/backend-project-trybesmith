import app from './app';
import ordersRouter from './routes/orders.routes';
import productsRouter from './routes/products.routes';
import userRouter from './routes/users.routes';

const PORT = 3000;

app.use(productsRouter);
app.use(userRouter);
app.use(ordersRouter);

const server = app.listen(PORT, () => console.log(
  `Server is running on PORT: ${PORT}`,
));

export default server;
