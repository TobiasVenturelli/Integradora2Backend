import ProductsService from "../services/productsServices.js";
import productModel from "../models/products.model.js";

const productsService = new ProductsService();

class ProductsController {
  async getAllProducts(req, res) {
    try {
      const limit = req.query.limit || 10;
      const products = await productsService.getAllProducts(limit);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async viewProducts(req, res) {
    try {
        const products = await productsService.viewProducts();
        res.render('realTimeProducts', {
            data: products
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

  async getProductById(req, res) {
    try {
      const id = req.params.id;
      const product = await productsService.getProductById(id);
      res.json({ product });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteProduct(req, res) {
    try {
      const id = req.params.pid;
      const productDeleted = await productsService.deleteProduct(id);

      req.io.emit('updatedProducts', await productModel.find().lean().exec());

      res.json({
        status: "Success",
        message: "Producto eliminado exitosamente",
        productDeleted
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async addProduct(req, res) {
    try {
      const product = req.body;

      if (!product.title) {
        return res.status(400).json({ message: "Falta el nombre del producto" });
      }

      const productAdded = await productsService.addProduct(product);

      req.io.emit('updatedProducts', await productModel.find().lean().exec());

      res.json({
        status: "Success",
        message: "Producto agregado exitosamente",
        productAdded
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateProduct(req, res) {
    try {
      const id = req.params.pid;
      const productToUpdate = req.body;

      const product = await productsService.updateProduct(id, productToUpdate);

      req.io.emit('updatedProducts', await productModel.find().lean().exec());

      res.json({
        status: "Success",
        message: "Producto actualizado exitosamente",
        product
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default ProductsController;
