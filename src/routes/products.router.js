import { Router } from "express";
import ProductsController from "../controllers/productsController.js";

const router = Router();
const productsController = new ProductsController();

router.get("/", productsController.getAllProducts);
router.get("/view", productsController.viewProducts);
router.get("/:id", productsController.getProductById);
router.delete("/:pid", productsController.deleteProduct);
router.post("/", productsController.addProduct);
router.put("/:pid", productsController.updateProduct);

export default router;
