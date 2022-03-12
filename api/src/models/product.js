const db = require("./index.js");
const user = db.users;

module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image_file_path: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING(1000),
      allownull: true,
    },
    price: {
      type: Sequelize.INTEGER,
      allownull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
    userid: {
      type: Sequelize.INTEGER
    },
  });
  return Product;
};
