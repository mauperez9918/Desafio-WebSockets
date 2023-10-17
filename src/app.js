const express = require("express");
const ProductManager = require("./productManager.js");
const productInstance = new ProductManager();

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/products", (req, res) => {
  const { query } = req;
  const { limit } = query;
  const products = productInstance.getProducts();
  if (!limit) {
    res.json(products);
  } else {
    res.json(products.slice(0, limit));
  }
});

app.get("/products/:pid", (req, res) => {
  const productId = req.params.pid;
  const productById = productInstance.getProductsById(productId);
  if (!productById) {
    res.json({ error: "su producto no existe." });
  } else {
    res.json(productById);
  }
});

app.listen(8080, () => {
  console.log("El servidor esta a la espera de peticiones.");
});
