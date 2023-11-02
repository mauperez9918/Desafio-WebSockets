const express = require("express");
const ProductManager = require("../productManager.js");
const productInstance = new ProductManager();

const router = express.Router();

router.get("/", (req, res) => {
  const products = productInstance.getProducts();
  res.render("home", { products });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", {});
});

module.exports = router;
