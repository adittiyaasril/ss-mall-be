const dbConfig = require("../config/db.config.js");
const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");
const pg = require("pg");

const client = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: dbConfig.dialectOptions,
  dialectModule: require("pg"),
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.client = client;

db.products = require("./product.model")(client, Sequelize);
db.purchases = require("./purchaseHistory.model")(client, Sequelize);
db.carts = require("./cart.model")(client, Sequelize);

db.products.hasMany(db.purchases, {
  foreignKey: "productId",
  onDelete: "CASCADE",
});
db.purchases.belongsTo(db.products, {
  foreignKey: "productId",
  onDelete: "CASCADE",
});

db.products.hasMany(db.carts, { foreignKey: "productId", onDelete: "CASCADE" });
db.carts.belongsTo(db.products, {
  foreignKey: "productId",
  onDelete: "CASCADE",
});

module.exports = db;
