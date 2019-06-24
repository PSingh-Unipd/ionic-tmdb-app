/**
 * Some encoding functions for barcode scan page(not implemented yet)
 */
const hmac = require("crypto-js").HmacSHA1;
const base64 = require("crypto-js").enc.Base64;
const encode = {hmac, base64};
export default encode;