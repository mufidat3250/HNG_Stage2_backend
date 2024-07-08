require("dotenv").config();
const { response } = require("express");
const { User } = require("../models");
const jwt = require("jsonwebtoken");


const userExtractor = async (req, res, next) => {
  try {
    if (req.token) {
      const decodedToken = jwt.verify(req.token, process.env.JWTSECRET, {
        expiresIn: 60 * 60,
      });
      const user = await User.findByPk(decodedToken.email);
      req["user"] = user;
    } else {
      return res.status(401).send({ error: "Token must be provided" });
    }
    next()
  } catch (error) {
    next(error);
  }
};

module.exports = userExtractor;
