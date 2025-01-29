import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
// app.use(morgan('dev'));
app.use(express.json());
app.get('/', (_req, res) => {
    res.send(' Stated');
});
export default app;
