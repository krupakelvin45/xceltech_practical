import axios from "axios";
var CryptoJS = require("crypto-js");

let login = async (email,password) => {

    let data = {
        email:email,
        password:password
    }

     // Encrypt
    let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'xceltopcoding').toString();

    let dataResponse;

    const user = await axios.post(`http://localhost:7789/users/login`,{"data":ciphertext}).catch((error)=> {
        dataResponse = error.response
    });

    if(user)
    {
        dataResponse = user.data;
    }
    
    console.log(dataResponse)
    let bytes  = CryptoJS.AES.decrypt(dataResponse, 'xceltopcoding');
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  
    return decryptedData;

}

let userSignup = async (email,password) => {

    let data = {
        email:email,
        password:password
    }

     // Encrypt
    let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'xceltopcoding').toString();

    let dataResponse;

    const user = await axios.post(`http://localhost:7789/users`,{"data":ciphertext}).catch((error)=> {
        dataResponse = error.response
    });

    let bytes  = CryptoJS.AES.decrypt(user.data, 'xceltopcoding');
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  
    return decryptedData;

}

const userAPI = {
    login,
    userSignup
}

export default userAPI 