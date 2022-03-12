const express = require("express");
const router = express.Router();
const products = require("../controllers/product.controller.js");

// define the home page route
router.get("/:userid", products.findAll);
router.post("/", products.create);
router.get("/productdetail/:id", products.findOne);
router.delete("/:id", products.delete);

module.exports = router;
