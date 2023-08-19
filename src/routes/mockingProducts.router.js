import express from "express";
import { generateMockProducts } from "../mocks/mocksProduct.js";

const router = express.Router();

router.get('/mockingproducts', (req, res) => {
     const mockProducts = generateMockProducts();
     res.json(mockProducts);
   });