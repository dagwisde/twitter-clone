/* Initialize variables */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { check, validationResult } = require("express-validator");
const monk = require("monk");

// Create database
const db = monk("localhost:27017/twitter");
const tweets = db.get("tweets");

db.then(() => {
  console.log("Connected correctly to server");
});

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

app.get("/tweets", (req, res) => {
  tweets.find({}, { sort: { created: -1 } }).then(tweets => {
    res.json(tweets);
  });
});

// Check if tweets are valid
function isValid(tweet) {
  return (
    tweet.userName &&
    tweet.userName.toString().trim() !== "" &&
    tweet.userMessage &&
    tweet.userMessage.toString().trim() !== ""
  );
}

app.post("/tweets", (req, res) => {
  if (isValid(req.body)) {
    const tweet = {
      userName: req.body.userName.toString(),
      userMessage: req.body.userMessage.toString(),
      created: new Date()
    };

    tweets.insert(tweet).then(createdTweet => {
      res.json(createdTweet);
    });

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
