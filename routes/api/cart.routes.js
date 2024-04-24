const express = require("express");
const router = express.Router();
const cartController = require("../../controllers/cart.controller");

router.post("/cart", cartController.addToCart);
router.delete("/cart/:productId", cartController.removeFromCart);
router.get("/cart", cartController.getCartContents);

module.exports = router;
