const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const socketInit = require("./socket.js");

const app = express();

const httpServer = app.listen(8080, () => {
  console.log("El servidor esta a la espera de peticiones.");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const productsRouter = require("./routes/products.router.js");
const cartRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");

app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter);

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

socketInit(httpServer);
