import CartService from "../services/cartServices.js";

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
      // Lógica para eliminar un producto del carrito
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async addProductToCart(req, res) {
    try {
      // Lógica para agregar un producto al carrito
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default CartController;
