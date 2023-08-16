import CartService from "../services/cartServices.js";
import ProductModel from "../models/products.model.js";

class CartController {
  constructor() {
    this.cartService = new CartService();
  }

  async getCarts(req, res) {
    try {
      const carts = await this.cartService.getCarts();
      res.json({ carts });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getCartById(req, res) {
    try {
      const id = req.params.id;
      const cart = await this.cartService.getCartById(id);
      res.json({ cart });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createCart(req, res) {
    try {
      const newCart = await this.cartService.createCart();
      res.json({ status: "Success", newCart });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteProductFromCart(req, res) {
    try {
      const cartID = req.params.cid;
      const productID = req.params.pid;

      const updatedCart = await this.cartService.deleteProductFromCart(cartID, productID);
      res.json({ status: "Success", updatedCart });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async addProductToCart(req, res) {
    try {
      const cartID = req.params.cid;
      const productID = req.params.pid;
      const quantity = req.body.quantity;

      const updatedCart = await this.cartService.addProductToCart(cartID, productID, quantity);
      res.json({ status: "success", message: "Producto agregado al carrito", cart: updatedCart });
    } catch (error) {
      res.status(500).json({ status: "error", error: error.message });
    }
  }

  async purchaseCart(req, res) {
    try {
      const cartID = req.params.cid;
      const purchasedProducts = await this.cartService.purchaseCart(cartID);

      if (purchasedProducts.failedProducts.length > 0) {
        res.json({ success: false, failedProducts: purchasedProducts.failedProducts });
      } else {
        res.json({ success: true });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default CartController;
