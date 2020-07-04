const app = require("express").Router();
const checkJwt = require("../middlewares/jwt");

app.get("/unprotected", (req, res) => {
  console.log("Unprotected API Called");
  res.json({
    message:
      "Hello from a public endpoint! You don't need to be authenticated to see this."
  });
});

app.get("/protected", checkJwt, (req, res) => {
  console.log("Protected API Called");
  res.json({
    message:
      "Hello from a private endpoint! You need to be authenticated to see this."
  });
});

module.exports = app;
