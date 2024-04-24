module.exports = (sequelize, DataTypes) => {
  const PurchaseHistory = sequelize.define("PurchaseHistory", {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return PurchaseHistory;
};
