import { Router } from "express";
import SessionController from "../controllers/sessionController.js"
import { isUserOrTokenValid } from "../middleware/verifyToken.js";

const router = Router();
const sessionController = new SessionController();


router.get('/register', sessionController.renderRegisterView);
router.post('/register', sessionController.registerUser);

router.get('/passwordRecover', sessionController.passwordRecover);
router.get('/recoverPassword', sessionController.recoverPassword);
router.post('/resetPassword', isUserOrTokenValid, sessionController.resetPassword);

router.get('/login', sessionController.renderLoginView);
router.post('/login', sessionController.loginUser);
router.get('/logout', sessionController.logoutUser);
router.get('/failregister', sessionController.failRegister);
router.get('/faillogin', sessionController.failLogin);

export default router;
