module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("Cart", {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Cart;
};
