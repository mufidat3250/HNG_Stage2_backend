require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Organisation} = require("../models");
const { v4: uuidv4 } = require("uuid");

const uniqueId = uuidv4();
const registerUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;
    const saltRound = 20;
    const passwordHash = await bcrypt.hash(password, saltRound);

    const newUser = {
      firstName,
      lastName,
      email,
      passwordHash,
      phone,
      userId: uniqueId,
    };
    const userForToken = {
      email: newUser.email,
      userId: newUser.userId,
    };

    const token = jwt.sign(userForToken, process.env.JWTSECRET, {
      expiresIn: 60 * 60,
    });
    const user = await User.create(newUser);
    await Organisation.create({name:`${firstName}'s Organisation`, orgId:uuidv4()})
    console.log(user)
    res.status(201).json({
      status: "success",
      message: "Registration successful",
      data: {
        accessToken: token,
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    const passwordCorrect =
      user === null ? false : bcrypt.compare(password, user.passwordHash);
    if (!(user && passwordCorrect)) {
      res.status(400).json({
        message: "invalid username or password",
      });
    }
    const formattedUser = user.get({ plain: true });

    const userForToken = {
      email: formattedUser.email,
      userId: formattedUser.userId,
    };
    const token = jwt.sign(userForToken, process.env.JWTSECRET);
    if(!res.headersSent){
      res.status(200).json({
        status: "success",
        message: "Login successful",
        data: {
          accessToken: token,
          user: {
            userId: formattedUser.userId,
            firstName: formattedUser.firstName,
            lastName: formattedUser.lastName,
            email: formattedUser.email,
            phone: formattedUser.phone,
          },
        },
      });
    }
  } catch (error) {
    res.json({
      status: "Bad request",
      message: "Authentication failed",
      statusCode: 401,
    });
  }
};
module.exports = { registerUser, loginUser };
