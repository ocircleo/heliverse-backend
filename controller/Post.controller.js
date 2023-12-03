const { default: mongoose } = require("mongoose");
const { userModel } = require("../model/userSchema");
const bcrypt = require("bcrypt");
const { groupModel } = require("../model/groupSchema");

const register = async (req, res, next) => {
  const email = req.body.email;
  const user = await userModel.findOne({ email: email });
  if (user) {
    res.send({
      error: true,
      message: "user not found",
    });
  } else {
    try {
      bcrypt.hash(req.body.password, 10, async function (err, hash) {
        const newUser = new userModel({
          ...req.body,
          password: hash,
        });
        const result = await newUser.save();
        res.send(result);
      });
    } catch (error) {
      res.send({
        error: true,
        message: error,
      });
    }
  }
};
const login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await userModel.findOne({ email: email });
  if (user) {
    bcrypt.compare(password, user.password, async function (err, result) {
      if (result) {
        res.status(201).send(user);
        return;
      }
      res.status(301).send({
        error: true,
        message: "wrong password",
      });
    });
  } else {
    res.send({
      error: true,
      message: "user not found",
    });
  }
};
const autoLogin = async (req, res, next) => {
  let email = req.body.email;
  const decodedEmail = req.decoded.email;
  if (email == decodedEmail) {
    try {
      const user = await userModel.findOne({ email: email });
      res.send(user);
    } catch (error) {
      res.send({
        error: true,
        message: error,
      });
    }
  } else {
    res.status(404).send({ error: true, message: "Unauthorized acces" });
  }
};
const makegroup = async (req, res, next) => {
  const body = req.body;
  const result = new groupModel(body);
  try {
    const newGroup = await result.save();
    res.status(201).send(newGroup);
  } catch (error) {
    res.send({
      error: true,
      message: error,
    });
  }
};
module.exports = {
  register,
  login,
  makegroup,
  autoLogin,
};
