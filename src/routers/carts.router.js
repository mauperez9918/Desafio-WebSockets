const express = require("express");
const CartManager = require("../cartsManager.js");
const cartInstance = new CartManager();

const router = express.Router();

router.post("/", (req, res) => {
  cartInstance.newCart();
  res.status(200).json({ message: "Su carrito ha sido creado." });
});

router.get("/:cid", (req, res) => {
  const { cid } = req.params;
  res.status(200).json(cartInstance.getCartById(cid));
});

router.post("/:cid/products/:pid", (req, res) => {
  const { cid, pid } = req.params;
  cartInstance.addProductToCart(cid, pid);
  res
    .status(200)
    .json({
      message: "Su producto ha sido agregado al carrito correctamente.",
    });
});
module.exports = router;
