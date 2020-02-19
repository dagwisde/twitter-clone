/* Initialize variables */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { check, validationResult } = require("express-validator");

const app = express();

/* Middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

/* Routes */
app.get("/", (req, res) => {
  res.json({
    message: "Hello!"
  });
});

app.post("/userpost", (req, res) => {
  console.log(req.body);
});

/* Listen */
const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
