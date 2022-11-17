const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { request, response } = require("express");
const stripe = require("stripe")("sk_test_51M4mAbSDSIC4wLQz8QCnnINK9JMU5RMK4KVzAWx8Lzrqx84vy850MCIxVDtOCxh5yrwDxcvhYJTytB4jWlN1E0oL00YcpaQH0b");
  // stripe secret key
//   "sk_test_51M4mAbSDSIC4wLQz8QCnnINK9JMU5RMK4KVzAWx8Lzrqx84vy850MCIxVDtOCxh5yrwDxcvhYJTytB4jWlN1E0oL00YcpaQH0b"
// );

// API

// - App config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("hello world"));

// app.get("/rajoo", (request, response) =>
//   response.status(200).send("Whats up rajoo")
// );

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen command
exports.api = functions.https.onRequest(app);

// Example endpoint

// API end point, come after running firebase emulator
// http://127.0.0.1:5001/kishan-clone-99/us-central1/api
