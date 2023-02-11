import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import routerProducts from "./router/products.router.js";
import routerCart from "./router/cart.router.js";
import realtimeproducts from "./router/realtime.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/api/products", routerProducts);
app.use("/api/cart", routerCart);
app.use("/realtimeproducts", realtimeproducts);

const httpServer = app.listen(8080, () => {
  console.log("\u001b[" + 34 + "m" + "Starting server..." + "\u001b[0m");
  setTimeout(() => {
    console.log("\u001b[" + 34 + "m" + "Done" + "\u001b[0m");
    setTimeout(() => {
      console.log("");
      console.log(
        "\u001b[" +
          32 +
          "m" +
          "      * Server runing on: http://localhost:8080" +
          "\u001b[0m"
      );
      console.log(
        "\u001b[" + 32 + "m" + "      * Listen on port 8080" + "\u001b[0m"
      );
      console.log("");
    }, 800);
  }, 1500);
});

export const socketServer = new Server(httpServer);