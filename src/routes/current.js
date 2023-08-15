import express from "express";
import passport from "passport";
import CurrentController from "../controllers/current.controller.js";

const router = express.Router();
const currentController = new CurrentController();

router.get('/current', passport.authenticate('current', { session: false }), currentController.getCurrentUser);

export default router;