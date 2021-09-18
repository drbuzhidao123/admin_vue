const CryptoJS = require("crypto-js"); //引用AES源码js

const key = CryptoJS.enc.Utf8.parse("HkPIucnOnw8SXXLx"); //为了避免补位，直接用16位的秘钥
const iv = CryptoJS.enc.Utf8.parse("ABCDEF1234123412"); //十六位十六进制数作为密钥偏移量

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
  var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString();
}

export default {
  Decrypt,
  Encrypt,
};
