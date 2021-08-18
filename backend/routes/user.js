const express = require("express");
const uniqueValidator = require("mongoose-unique-validator");

const router = express.Router();

const User = require("../models/user");

router.post("/signup", (req, res, next) => {});

module.exports = router;
