// controllers/cartController.js
const db = require("../models");
const Cart = db.carts;
const Product = db.products;

exports.getCartContents = async (req, res) => {
  try {
    const cartContents = await Cart.findAll({
      include: [{ model: Product }],
    });

    res.status(200).json(cartContents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addToCart = async (req, res) => {
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

    let cartItem = await Cart.findOne({ where: { productId } });
    if (cartItem) {
      cartItem.quantity += parseInt(quantity);
      await cartItem.save();
    } else {
      cartItem = await Cart.create({ productId, quantity });
    }
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cartItem = await Cart.findOne({ where: { productId } });
    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    await cartItem.destroy();

    res.status(200).json({ message: "Product deleted from cart successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
