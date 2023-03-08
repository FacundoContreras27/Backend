import { Router } from "express";
import ProductManager from "../clases/ProductManager.js";

const routerProducts = Router();
const pm = new ProductManager("./src/storage/products.json");

routerProducts.get("/", async (req, res) => {
  const { limit } = req.query;
  const products = await pm.getProducts(parseInt());
  const newProduct = products.slice(0, limit);
  res.render("home", { products: newProduct });
});

routerProducts.get("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  const id = parseInt(idProduct);
  const product = await pm.getProductById(id);
  res.json({ mesage: `Product with id ${id} sent succesfully`, product });
});

routerProducts.post("/", async (req, res) => {
  const prod = req.body;
  res.json(await pm.addProduct(prod));
});

routerProducts.delete("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  const id = parseInt(idProduct);
  res.json(await pm.deleteProduct(id));
});

routerProducts.put("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  const prod = req.body;
  res.json(await pm.updateProduct(parseInt(idProduct), prod));
});

export default routerProducts;