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

app.post("/api/posts", (req, res, next) => {
  const posts = req.body;
  console.log(posts);
  res.status(201).json({
    message: "Post added succesfully",
  });
});

app.get("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "21vsfvf",
      title: "First Post",
      content: "This is the first post's content",
    },
    {
      id: "ht425gn",
      title: "Second Post",
      content: "This is the Second post's content",
    },
  ];

  res.status(200).json({
    message: "Posts Fetched Succesfully",
    posts: posts,
  });
});

module.exports = app;
