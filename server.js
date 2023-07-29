import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from "./routes/productRoutes.js"
import cors from 'cors'

//config env
dotenv.config();


//database connection
connectDB();

//rest object
const app = express()

//middlewere
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


//router
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes)


//rest api
app.get('/',(req,res)=>{
    res.send("welocome to Ecommers app")
})


const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`server is runing on ${PORT}`);
})