const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,  X-Custom-Header"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/mean_db", {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to database."))
  .catch(() => {
    console.log("Cannot connect to database. Exiting.");
    process.exit();
  });

const Post = require("./models/post");

app.post("/api/posts", (req, res, next) => {
  // const posts = req.body;
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then((createdPost) => {
    res.status(201).json({
      message: "add Post succesfully",
      postId: createdPost._id,
    });
  });
});

app.get("/api/posts", (req, res, next) => {
  Post.find().then((documents) => {
    // console.log(documents);
    res.status(200).json({
      message: "GEt Posts Succesfully",
      posts: documents,
    });
  });
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json({
      message: "Posts Deleted",
    });
  });
});

module.exports = app;
