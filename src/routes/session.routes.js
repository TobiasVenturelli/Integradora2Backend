     import { Router } from "express";
     import SessionController from "../controllers/sessionController.js"

     const router = Router();
     const sessionController = new SessionController();


     router.get('/register', sessionController.renderRegisterView);
     router.post('/register', sessionController.registerUser);
     router.get('/login', sessionController.renderLoginView);
     router.post('/login', sessionController.loginUser);
     router.get('/logout', sessionController.logoutUser);
     router.get('/failregister', sessionController.failRegister);
     router.get('/faillogin', sessionController.failLogin);

     export default router;
