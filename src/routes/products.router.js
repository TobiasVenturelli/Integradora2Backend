import { Router } from "express";
import ProductsController from "../controllers/productsController.js";
import { isAdmin } from "../middleware/authMiddleware.js"; 
import passport from "passport"

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.post("/", passport.authenticate('current', { session: false }), isAdmin, productsController.addProduct);
productsRouter.put("/:pid", passport.authenticate('current', { session: false }), isAdmin, productsController.updateProduct);
productsRouter.delete("/:pid", passport.authenticate('current', { session: false }), isAdmin, productsController.deleteProduct);

export default productsRouter;