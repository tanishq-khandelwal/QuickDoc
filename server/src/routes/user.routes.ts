import { Router } from "express";
import { RegisterUser } from "../controllers/user.controller.ts";

const router=Router();

router.post('/register',RegisterUser);

export default router;