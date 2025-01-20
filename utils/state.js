const CryptoJS = require("crypto-js");

const salt = CryptoJS.lib.WordArray.random(128 / 8).toString();

module.exports = salt;
