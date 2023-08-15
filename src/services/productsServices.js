import productModel from "../models/products.model.js";

class ProductsService {
  async getAllProducts(limit = 10) {
    try {
      const products = await productModel.find().limit(limit).lean().exec();
      return products;
    } catch (error) {
      throw new Error('Error al obtener los productos');
    }
  }

  async getProductById(id) {
    try {
      const product = await productModel.findById(id).lean().exec();

      if (product) {
        return product;
      } else {
        throw new Error('Producto no encontrado');
      }
    } catch (error) {
      throw new Error('Error al obtener el producto');
    }
  }

  async deleteProduct(id) {
    try {
      const productDeleted = await productModel.findByIdAndDelete(id).lean().exec();
      return productDeleted;
    } catch (error) {
      throw new Error('Error al eliminar el producto');
    }
  }

  async addProduct(productData) {
    try {
      const productAdded = await productModel.create(productData);
      return productAdded;
    } catch (error) {
      throw new Error('Error al agregar el producto');
    }
  }

  async updateProduct(id, updatedData) {
    try {
      const productUpdated = await productModel.findByIdAndUpdate(id, updatedData, { new: true }).lean().exec();
      return productUpdated;
    } catch (error) {
      throw new Error('Error al actualizar el producto');
    }
  }
}

export default ProductsService;
