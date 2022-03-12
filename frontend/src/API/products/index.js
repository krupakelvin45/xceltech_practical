import axios from "axios";
var CryptoJS = require("crypto-js");

let getProductDataforUser = async (userid) => {
  const products = await axios.get(`http://localhost:7789/products/${userid}`);
  let bytes  = CryptoJS.AES.decrypt(products.data, 'xceltopcoding');
  let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  
  return decryptedData;
};

let addProductAPI = async (data) => {

  // Encrypt
  let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'xceltopcoding').toString();

  let config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let productsAdd = await axios
    .post(`http://localhost:7789/products`, {"data":ciphertext}, config)
    .catch((error) => console.log(error));

  let bytes  = CryptoJS.AES.decrypt(productsAdd.data, 'xceltopcoding');
  let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  return decryptedData;
};

let deleteProduct = async (productid) => {
  const products = await axios.delete(`http://localhost:7789/products/${productid}`);
  let bytes  = CryptoJS.AES.decrypt(products.data, 'xceltopcoding');
  let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};

const productAPI = {
  getProductDataforUser,
  addProductAPI,
  deleteProduct
};

export default productAPI;
