class Product {
    constructor(title, description, price, thumbnail, code, stock) {
      this.title = title;
      this.description = description;
      this.price = price;
      this.thumbnail = thumbnail;
      this.code = code;
      this.stock = stock;
    }
    setId(id) {
      this.id = id;
    }
  }
  
  class ProductManager {
      #products
    constructor() {
      this.#products = [];
      this.idManager = 1;
    }
  
    validateProduct(product) {
      let flag = false;
      this.#products.forEach((producto) => {producto.code === product.code && (flag = true);
      });
      if (!flag) {
        if (
          product.title !== "" &&
          product.description !== "" &&
          product.price !== "" &&
          product.thumbnail !== "" &&
          product.code !== "" &&
          product.stock !== ""
        ) {
          return true; 
        } else {
          return `Error ${product.title}`;
        }
      } else {
        return `Error ${product.title} `;
      }
    }
  
    addProduct(product) {
      const validacion = this.validateProduct(product)
      if (validacion === true) {
        product.setId(this.idManager);
        this.idManager += 1;
        this.#products.push(product);
        return `Carga de producto ${product.title} correcta`
      } else {
        return validacion
      }
    }
  
    getProdcuts(){
      return this.#products
    }
  
    getProductById(id){
      return (this.#products.find(product => product.id === id)) || 'Error: Not Found'
    }
  }
  
  const producto1 = new Product("Remera", "Buzo", 1000, "a", 3000, 500);
  
  const producto2 = new Product("Pantalon", "Bermuda", 2000, "b", 3000, 400);
  
  const producto3 = new Product("Ojota", "Piluso", 1000, "c", 2000, 300);
  
  const producto4 = new Product('Medias', '', '', '', '', '')
  
  const ManejadorProductos = new ProductManager();
  
  console.log(ManejadorProductos.addProduct(producto1))
  
  console.log(ManejadorProductos.addProduct(producto2))
  
  console.log(ManejadorProductos.addProduct(producto3)) 

  console.log(ManejadorProductos.addProduct(producto4)) 
  
  
  console.log('Metodo getProducts')
  console.log(ManejadorProductos.getProdcuts())
  
  console.log('Metodo getProductById')
  console.log(ManejadorProductos.getProductById(2))
  
  console.log('Metodo getProductById')
  console.log(ManejadorProductos.getProductById(10)) 