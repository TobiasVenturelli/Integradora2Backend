import { Router } from "express";
import passport from "passport";
import CurrentController from "../controllers/current.controller.js";
import { isAdmin } from "../middlewares/authMiddleware.js"

const currentRouter = Router(); 
const currentController = new CurrentController();

currentRouter.get('/current', passport.authenticate('current', { session: false }), isAdmin, currentController.getCurrentUser);

export default currentRouter; 