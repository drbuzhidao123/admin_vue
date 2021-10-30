const CryptoJS = require("crypto-js"); //引用AES源码js

const key = CryptoJS.enc.Utf8.parse("HkPIucnOnw8SXXLx"); //uft-8字符串转成WordArray，WordArray为32位的字符串,为了避免补位，直接用16位的秘钥
const iv = CryptoJS.enc.Utf8.parse("ABCDEF1234123412"); //十六位十六进制数作为密钥偏移量

//解密方法
//params: 参数必须为Base64字符串。
function Decrypt(data) {
  let decrypt = CryptoJS.AES.decrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypt.toString(CryptoJS.enc.Utf8); //WordArray对象转utf8字符串
}

//加密方法
//params: 参数key，data都为WordArray对象
//return: 返回的密码对象得是Base64字符串
function Encrypt(data) {
  var encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }); //encrypted为WordArray对象
  return encrypted.toString(); //密码对象的.ciphertext是转成base64字符串
}

export default {
  Decrypt,
  Encrypt,
};
