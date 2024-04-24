const express = require("express");
const router = express.Router();
const purchaseHistoryController = require("../../controllers/purchaseHistory.controller");

router.post("/purchases", purchaseHistoryController.createPurchase);
router.get("/purchases", purchaseHistoryController.getPurchaseHistory);

module.exports = router;
