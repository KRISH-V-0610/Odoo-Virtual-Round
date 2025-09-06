//External Modules
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';



//Connect to MongoDB
import { connectDB } from './lib/db.js';

//Route Imports
import authRoutes from './router/auth.routes.js'; 

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



app.use('/api/auth', authRoutes)



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server is running on port: http://localhost:${PORT}`);
  connectDB();
});