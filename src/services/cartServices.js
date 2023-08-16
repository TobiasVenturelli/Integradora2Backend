import cartModel from "../models/cart.model.js";

class CartService {
  async getCarts() {
    try {
      const carts = await cartModel.find().lean().exec();
      return carts;
    } catch (error) {
      throw new Error('Error al obtener carritos');
    }
  }

  async getCartById(id) {
    try {
      const cart = await cartModel.findOne({ _id: id }).lean().exec();
      return cart;
    } catch (error) {
      throw new Error('Error al obtener el carrito');
    }
  }

  async createCart() {
    try {
      const newCart = await cartModel.create({});
      return newCart;
    } catch (error) {
      throw new Error('Error al crear el carrito');
    }
  }

  async deleteProductFromCart(cartId, productId) {
    try {
      const cart = await cartModel.findById(cartId);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
  
      const productIndex = cart.products.findIndex(product => product.id === productId);
      if (productIndex !== -1) {
        cart.products.splice(productIndex, 1);
        await cart.save();
        return cart;
      } else {
        throw new Error("Producto no encontrado en el carrito");
      }
    } catch (error) {
      throw new Error("Error al eliminar el producto del carrito: " + error.message);
    }
  }
  
  async addProductToCart(cartId, productId, quantity) {
    try {
      const cart = await cartModel.findById(cartId);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }
  
      // Agregar el producto al carrito con la cantidad especificada
      cart.products.push({ id: productId, quantity });
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error("Error al agregar el producto al carrito: " + error.message);
    }
  }
  async updateCart(id, cart) {
    return cartManager.update(id, cart);
  }

  async purchaseCart(cartId) {
    const cart = await this.getById(cartId);
    const failedProducts = [];

    const purchasedProducts = [];

    for (const product of cart.products) {
        const productInfo = await productService.getProductById(product.id);
        
        if (productInfo.stock >= product.quantity) {
            // Restar la cantidad del producto del stock
            await productService.updateProductStock(product.id, product.quantity * -1);

            purchasedProducts.push({ product: productInfo, quantity: product.quantity });
        } else {
            // El producto no tiene suficiente stock para la compra
            failedProducts.push(product.id);
        }
    }

    // Generar el ticket con los datos de la compra
    const ticket = await ticketService.generateTicket({
        purchaser: cart.user,
        products: purchasedProducts,
        amount: this.calculateTotalAmount(purchasedProducts)
    });

    // Actualizar el carrito con los productos no comprados
    const remainingProducts = cart.products.filter(product => !failedProducts.includes(product.id));
    cart.products = remainingProducts;
    await this.update(cartId, cart);

    return { failedProducts, ticket };
}

}

export default CartService;
