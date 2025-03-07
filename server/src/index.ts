import express from "express";
import dotenv from "dotenv";
import morgan from "morgan"
import cors from "cors";
import userRoutes from "./routes/user.routes.ts"
import { createCheckoutSession } from "./controllers/stripe.controller.ts";
import emailRoutes from "./routes/email.routes.ts";

dotenv.config();

const app=express();
app.use(morgan('dev'));

app.use(express.json());


app.set("trust proxy", 1);

app.use(
    cors({
      origin: ["http://localhost:5173", "*"],
      credentials: true,
      methods: "GET, POST, PUT, DELETE", // Specify the allowed HTTP methods
      allowedHeaders: "Content-Type, Authorization",
    })
  );
  

app.use('/api/v1/user',userRoutes);
app.post('/api/create-checkout-session',createCheckoutSession);
app.use("/api/v1/send", emailRoutes);

app.get('/',(_req,res)=>{
    res.send(' Server Started')
})

export default app;