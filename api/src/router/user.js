const express = require("express");
const router = express.Router();
const users = require("../controllers/user.controller.js");

// define the home page route
router.get("/:email", users.findOne);
router.post("/login",users.findOne);
router.post("/",users.create);
router.get("/getAllUsers",users.findAll);
module.exports = router;