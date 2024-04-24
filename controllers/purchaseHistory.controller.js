const db = require("../models");
const PurchaseHistory = db.purchases;
const Product = db.products;

exports.createPurchase = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: "All required fields must be provided" });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.quantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    product.quantity -= parseInt(quantity);
    await product.save();

    const purchase = await PurchaseHistory.create({
      productId,
      quantity,
    });

    res.status(201).json(purchase);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPurchaseHistory = async (req, res) => {
  try {
    const purchases = await PurchaseHistory.findAll();
    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
