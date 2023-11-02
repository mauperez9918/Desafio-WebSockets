const express = require("express");
const ProductManager = require("../productManager.js");
const productInstance = new ProductManager();

const router = express.Router();

router.get("/", (req, res) => {
  const { query } = req;
  const { limit } = query;
  const products = productInstance.getProducts();
  if (!limit) {
    res.status(200).json(products);
  } else {
    res.status(200).json(products.slice(0, limit));
  }
});

router.get("/:pid", (req, res) => {
  const productId = req.params.pid;
  const productById = productInstance.getProductById(productId);
  if (!productById) {
    res.json({ error: "su producto no existe." });
  } else {
    res.json(productById);
  }
});

router.post("/", (req, res) => {
  const { title, description, price, thumbnail, code, stock, category } =
    req.body;
  productInstance.addProduct(
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category
  );
  res.status(201).json({ message: "Su producto ha sido agregado." });
});

router.put("/:pid", (req, res) => {
  const productId = req.params.pid;
  const { body } = req;
  productInstance.updateProduct(productId, body);
  res.status(200).json({ message: "Su producto ha sido actualizado." });
});

router.delete("/:pid", (req, res) => {
  const productId = req.params.pid;
  productInstance.deleteProduct(productId);
  res.status(200).json({ message: "Su producto ha sido eliminado." });
});

module.exports = router;
