const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const CryptoJS = require("crypto-js");

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  let cipherPassword = CryptoJS.AES.encrypt(
    JSON.stringify(req.body.password),
    "xceltopcoding"
  ).toString();

  // Create a User
  const user = {
    email: req.body.email,
    password: cipherPassword,
  };

  // Save User in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  User.findAll({ where: null })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const data = req.body;

  User.findOne({ where: { email: data.email } })
    .then((responseData) => {
      if (responseData) {

        console.log(responseData.password)

        var bytes = CryptoJS.AES.decrypt(
          responseData.password,
          "xceltopcoding"
        );

        console.log("received password "+data.password)
        var decryptedDataPass = bytes.toString(CryptoJS.enc.Utf8);
        console.log(decryptedDataPass)
        if (decryptedDataPass == `"${data.password}"`) {
          console.log("password equal");
          res.send(responseData);
        } else {
          console.log("password not equal");

          res.status(400).send({
            message: `Password is wrong for the email`,
          });
        }
      } else {
        res.status(404).send({
          message: `Cannot find User with given credentials.`,
        });
      }
    })
    .catch((err) => {
      console.log("Not found user with email")
      res.status(500).send({
        message: "Error retrieving User with id=" + email,
      });
    });
};
// Delete a User with the specified id in the request
exports.delete = (req, res) => {};
// Delete all Users from the database.
exports.deleteAll = (req, res) => {};
