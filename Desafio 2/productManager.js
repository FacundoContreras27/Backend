const fs = require("fs");
const Prod = require("./product.js");

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  #validateProduct(product) { 
    if (
      product.title !== "" &&
      product.description !== "" &&
      product.price !== "" &&
      product.thumbnail !== "" &&
      product.code !== "" &&
      product.stock !== ""
    ) {
      const products = this.getProducts();
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

  getProducts() {
    if (fs.existsSync(this.path)) {
      const products = JSON.parse(fs.readFileSync(this.path, "utf8"));
      return products;
    } else {
      fs.writeFileSync(this.path, "[]");
      return fs.readFileSync(this.path, "utf8");
    }
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const products = this.getProducts();
    const product = new Prod.Product(
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      products.length + 1 
    );

    if (this.#validateProduct(product)) {
      products.push(product);
      fs.writeFileSync(this.path, JSON.stringify(products));
      return "Producto agregado";
    } else {
      return "Error: Producto no agregado";
    }
  }

  getProductById(id) {
    const products = this.getProducts();
    return products[id - 1];
  }

  deleteProduct(id) {
    const products = this.getProducts();
    const newProducts = products.filter((product) => product.id !== id);
    fs.writeFileSync(this.path, JSON.stringify(newProducts));
    return "Producto eliminado";
  }

  updateProduct(id, selector, value) { 
    const products = this.getProducts();
    switch(selector) {
      case "title": products[id-1].title = value; break;
      case "description": products[id-1].description = value; break;
      case "price": products[id-1].price = value; break;
      case "thumbnail": products[id-1].thumbnail = value; break;
      case "code": products[id-1].code = value; break;
      case "stock": products[id-1].stock = value; break;
    }
    fs.writeFileSync(this.path, JSON.stringify(products))
    return 'Objeto editado correctamente'
  }
}

module.exports.ProductManager = ProductManager;