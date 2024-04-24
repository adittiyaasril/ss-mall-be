const express = require("express");
const router = express.Router();

const productRoutes = require("./api/product.routes");
const purchaseHistoryRoutes = require("./api/purchaseHistory.routes");
const cartRoutes = require("./api/cart.routes");

router.use("/api", productRoutes);
router.use("/api", purchaseHistoryRoutes);
router.use("/api", cartRoutes);

module.exports = router;
