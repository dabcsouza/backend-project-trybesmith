import express from 'express';
import rescue from 'express-rescue';
import ordersRouter from './routes/orders.routes';
import productsRouter from './routes/products.routes';
import userRouter from './routes/users.routes';

const app = express();

app.use(express.json());
app.use(rescue(productsRouter));
app.use(rescue(userRouter));
app.use(rescue(ordersRouter));

export default app;
