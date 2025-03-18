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
    origin: ["http://localhost:5173", "https://quick-doc-drab.vercel.app"],
    credentials: true, // Required for cookies to be sent
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  })
);

  

app.use('/api/v1/user',userRoutes);
app.post('/api/create-checkout-session',createCheckoutSession);
app.use("/api/v1/send", emailRoutes);

app.get('/',(_req,res)=>{
    res.send(' Server Started')
})

export default app;