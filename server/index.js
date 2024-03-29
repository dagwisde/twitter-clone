/* Initialize variables */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const monk = require("monk");
const helmet = require("helmet");
const Filter = require("bad-words");
const rateLimit = require("express-rate-limit");
const path = require("path");

// Create database
const db = monk(process.env.MONGODB_URI || "localhost:27017/twitter");

const tweets = db.get("tweets");
// Profanity filter
const filter = new Filter();

const app = express();

/* Middleware */
app.use(express.static("client"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

/* Routes */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/"));
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

app.use(
  rateLimit({
    windowMs: 15 * 1000, // 15 seconds
    max: 1
  })
);

app.post("/tweets", (req, res) => {
  if (isValid(req.body)) {
    const tweet = {
      userName: filter.clean(req.body.userName.toString()),
      userMessage: filter.clean(req.body.userMessage.toString()),
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

app.listen(process.env.PORT || port, () => {
  console.log(`Listening on port: ${port}`);
});
