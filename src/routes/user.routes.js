
import { Router } from "express";
import UserController from "../controllers/userController.js"; 

const router = Router();
const userController = new UserController();

router.put('/api/users/premium/:uid', userController.changeUserRole);

export default router;
