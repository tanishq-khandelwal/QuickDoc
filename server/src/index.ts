import express from "express";
import dotenv from "dotenv";
import morgan from "morgan"
import userRoutes from "./routes/user.routes.ts"

dotenv.config();

const app=express();
app.use(morgan('dev'));
app.use(express.json());


app.use('/api/v1/user',userRoutes);

app.get('/',(_req,res)=>{
    res.send(' Server Started')
})

export default app;