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

function isValid(tweet) {
  return (
    tweet.userName &&
    tweet.userName.toString().trim() !== "" &&
    tweet.userMessage &&
    tweet.userMessage.toString().trim() !== ""
  );
}

app.post("/userpost", (req, res) => {
  if (isValid(req.body)) {
    const tweet = {
      userName: req.body.userName.toString(),
      userMessage: req.body.userMessage.toString()
    };
    console.log(tweet);
  } else {
    res.status(422);
    res.json({
      message: "Name and post content are required!"
    });
  }
});

/* Listen */
const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
