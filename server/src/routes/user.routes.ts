import { Router } from "express";
import { LoginUser, LogoutUser, RegisterUser } from "../controllers/user.controller.ts";

const router=Router();

router.post('/register',RegisterUser);
router.post('/login',LoginUser);
router.post('/logout',LogoutUser);

export default router;