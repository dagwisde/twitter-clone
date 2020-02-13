/* Initialize variables */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

/* Middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Routes */

/* Listen */
app.listen(3000, () => {
  console.log("Listening");
});
