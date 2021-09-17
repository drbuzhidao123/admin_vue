const CryptoJS = require("crypto-js"); //引用AES源码js

const key = CryptoJS.enc.Utf8.parse("HkPIucnOnw8SXXLx"); //为了避免补位，直接用16位的秘钥

//解密方法
function Decrypt(data) {
  let decrypt = CryptoJS.AES.decrypt(data, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr;
}

//加密方法
function Encrypt(data) {
  var encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}

export default {
  Decrypt,
  Encrypt,
};
