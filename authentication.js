const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();

const apiKey = process.env.API_KEY; // const apiKey = 'paste key here'
const apiSecret = process.env.API_SECRET; // const apiSecret = 'paste secret here'

const WebSocket = require("ws");

let CID = Date.now();

const nonce = (Date.now() * 1000).toString();
const authPayload = "AUTH" + nonce;
const authSig = crypto
  .createHmac("sha384", apiSecret)
  .update(authPayload)
  .digest("hex");

const Signpayload = {
  nonce,
  event: "auth",
  apiKey: apiKey, //API key
  authSig: authSig, //Authentication Sig
  authPayload: authPayload,
  authNonce: nonce,
  calc: 1,
};

const wss = new WebSocket("wss://api.bitfinex.com/ws/2"); // Create new Websocket

module.exports = { Signpayload, wss };
