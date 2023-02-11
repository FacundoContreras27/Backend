import { Router } from "express";
import { Server } from "socket.io";
import ProductManager from "../clases/ProductManager.js";
import { socketServer } from "../server.js";

const realtimeproducts = Router();
const pm = new ProductManager("./src/storage/products.json");

realtimeproducts.get("/", async (req, res) => {
  const { limit } = req.query;
  const products = await pm.getProducts(parseInt());
  const newProduct = products.slice(0, limit);
  res.render("realtimeproducts", { products: newProduct });
});

realtimeproducts.post("/", async (req, res) => {
  const prod = req.body;
  await pm.addProduct(prod);
  socketServer.sockets.emit("sendProduct", prod);
  res.redirect("/realtimeproducts");
});

export default realtimeproducts;