import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './src/routes/user.routes.js';




const app = express();

app.use(cors({
    origin: '*', // allow all origins (use your frontend URL in production)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    
  }));
app.use(express.json());
app.use(cookieParser());


app.use("/api/v1/users",userRouter);
export default app;