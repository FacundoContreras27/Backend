import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async #validateProduct(product) {
    if (
      product.category !== "" &&
      product.name !== "" &&
      product.description !== "" &&
      product.price !== "" &&
      product.image !== "" &&
      product.code !== "" &&
      product.stock !== "" &&
      product.status !== ""
    ) {
      const products = await this.getProducts();
      let flag = false;
      products.forEach((element) => {
        if (element.code === product.code) {
          flag = true;
          return false;
        }
      });
      if (!flag) {
        return true;
      }
    } else {
      return false;
    }
  }

  async getProducts() {
    if (fs.existsSync(this.path)) {
      const products = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(products);
    } else {
      await fs.writeFile(this.path, "[]");
      return await fs.readFile(this.path, "utf8");
    }
  }

  async addProduct(product) {
    const products = await this.getProducts();
    const id = products[products.length - 1].id + 1;
    product.id = id;

    if (await this.#validateProduct(product)) {
      products.push(product);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t"),
        "utf-8"
      );
      return "Producto agregado con exito";
    } else {
      return "Error al agregar el producto";
    }
  }

  async getProductById(id) {
    const products = await this.getProducts();
    const prod = products.find((product) => product.id === id);
    return prod;
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const newProducts = products.filter((product) => product.id !== id); 
    await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
    return "Producto eliminado con exito";
  }

  async updateProduct(id, product) {
    const products = await this.getProducts();
    products.forEach((prod) => {
      if (prod.id === id) {
        prod.category = product.category;
        prod.name = product.name;
        prod.price = products.price;
        prod.description = product.description;
        prod.image = product.image;
        prod.code = product.code;
        prod.stock = product.stock;
      }
    });
    await fs.promises.writeFile(this.path, JSON.stringify(products));
    return "Producto editado correctamente";
  }
}

export default ProductManager;