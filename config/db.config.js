module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "230798",
  DB: "mall-db",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
