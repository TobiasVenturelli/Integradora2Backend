import { Router } from "express";
import CartController from "../controllers/cartController.js";

const router = Router();
const cartController = new CartController();

router.get("/", cartController.getCarts.bind(cartController));
router.get("/:id", cartController.getCartById.bind(cartController));
router.post("/", cartController.createCart.bind(cartController));
router.delete("/:cid/product/:pid", cartController.deleteProductFromCart.bind(cartController));
router.post("/:cid/product/:pid", cartController.addProductToCart.bind(cartController));
router.post("/:cid/purchase", cartController.purchaseCart);

export default router;
