
//External Modules
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';


//Connect to MongoDB
import { connectDB } from './lib/db.js';

// Routes
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import productRouter from './routes/product.routes.js';
import cartRouter from './routes/cart.routes.js';
import orderRouter from './routes/order.routes.js';

dotenv.config();
const app = express();



//data-parser middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // Enable Set-Cookie headers.
}))


// Routes
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', orderRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running'
  });
});

// Handle undefined routes
app.all('*', (req, res) => {
  res.status(404).json({
    status: '404 NOT FOUND',
    message: `Can't find ${req.originalUrl} on this server`
  });
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server is running on port: http://localhost:${PORT}`);
  connectDB();
});

export default app;