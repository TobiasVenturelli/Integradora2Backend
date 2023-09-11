import productModel from "../models/products.model.js";

class ProductsService {
  async getAllProducts(limit) {
    const products = await productModel.find().limit(limit);
    return products;
  }

  async viewProducts() {
    const products = await productModel.find();
    return products;
  }

  async getProductById(id) {
    const product = await productModel.findById(id);
    return product;
  }

  async deleteProduct(id) {
    const productDeleted = await productModel.findByIdAndDelete(id);
    return productDeleted;
  }

  async addProduct(productData) {
    if (!productData.title) {
      throw new Error("Falta el nombre del producto");
    }

    if (!productData.owner) {
      productData.owner = "admin";
    }

    const newProduct = new productModel(productData);
    const productAdded = await newProduct.save();
    return productAdded;
  }

  async updateProduct(id, productData) {
    const product = await productModel.findByIdAndUpdate(id, productData, { new: true });
    return product;
  }
}

export default ProductsService;
