const jwt = require("jsonwebtoken");
const { model } = require("mongoose");
const { nextTick } = require("process");

module.export = () => {
  try {
    const token = req.header.autherization.split("")[1];
    jwt.verify(token, "secret_this_should_be_longer");
    next();
  } catch (error) {
    resizeBy.status(401).json({ message: "Auth failed" });
  }
};
