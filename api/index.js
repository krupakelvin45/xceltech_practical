const express = require("express");
const app = express();
const port = 7789;
const router = require("./src/router");
const db = require("./src/models");
const bodyparser = require("body-parser");
const CryptoJS = require("crypto-js");

// respond with "hello world" when a GET request is made to the homepage
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods","*")
  next();
});

app.use(bodyparser.json());

app.use(function(req,res,next){
  if(req.body.data)
  {
    var bytes  = CryptoJS.AES.decrypt(req.body.data, 'xceltopcoding');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    req.body = decryptedData
  }
  next()
})

app.use(encryptResponseInterceptor)

app.use("/users", router.user);
app.use("/products", router.product);

db.sequelize.sync().then(() => {
  console.log("Drop and re-sync db.");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function encryptResponseInterceptor(req, res, next) {
  const originalSend = res.send;

  res.send = function () {
      arguments[0] = encryptResponse(arguments[0]);
      originalSend.apply(res, arguments);
  };
  next();
}

function encryptResponse(originalData) {
  let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(originalData), 'xceltopcoding').toString();
  
  return ciphertext
  // place your encryption logic here, I'm just adding a string in this example
  // return originalData + " modified";
}
