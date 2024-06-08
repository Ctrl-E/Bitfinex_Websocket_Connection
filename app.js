const WebSocket = require("ws");

const { wss, Signpayload } = require("./authentication");
const { tickerSubscription } = require("./subscriptions");

wss.on("open", () => {
  try {
    console.log("WebSocket connection opened");
    // Send authentication payload
    wss.send(JSON.stringify(Signpayload));
    // Subscriptions
    wss.send(JSON.stringify(tickerSubscription));
  } catch (error) {
    console.log("Error parsing JSON:", error.message);
  }
});

wss.on("message", (msg) => {
  try {
    const msg_data = JSON.parse(msg);
    console.log(msg_data);
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
});

// Handle WebSocket errors
wss.on("error", (err) => {
  console.error("WebSocket error:", err);
});
