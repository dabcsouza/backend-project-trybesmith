import rescue from 'express-rescue';
import app from './app';
import ordersRouter from './routes/orders.routes';
import productsRouter from './routes/products.routes';
import userRouter from './routes/users.routes';

const PORT = 3000;

app.use(rescue(productsRouter));
app.use(rescue(userRouter));
app.use(rescue(ordersRouter));

const server = app.listen(PORT, () => console.log(
  `Server is running on PORT: ${PORT}`,
));

export default server;
