const { groupModel } = require("../model/groupSchema");
const { userModel } = require("../model/userSchema");

const estimate = async (req, res, next) => {
  const result = await userModel.countDocuments();
  res.send({ totalUser: result });
};
const getUsers = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;
  let text = req.query.text;
  let domain, available, gender;
  domain = req.query.domain;
  available = req.query.available;
  gender = req.query.gender;
  const query = [];
  if (domain != "null") {
    query.push({ domain: domain });
  }
  if (gender != "null") {
    query.push({ gender: gender });
  }
  if (available != "null") {
    query.push({ available: Boolean(available) });
  }
  if (text != "null") {
    console.log("in text");
    try {
      const response = await userModel
        .find({
          $and: [{ first_name: { $regex: new RegExp(text, "i") } }, ...query],
        })
        .limit(limit)
        .skip(skip);
      if (response) {
        res.status(200).send(response);
      } else {
        res.status(404).send({ message: "not found" });
      }
    } catch (error) {
      res.send(error);
    }
  } else {
    console.log("over hare");
    try {
      const response = await userModel.find().limit(limit).skip(skip);
      if (response) {
        res.status(200).send(response);
      } else {
        res.status(404).send({ message: "not found" });
      }
    } catch (error) {
      res.send(error);
    }
  }
};
const getSingleUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const response = await userModel.findOne({ _id: id });
    if (response) {
      res.status(200).send(response);
    } else {
      res.status(404).send({ message: "not found" });
    }
  } catch (error) {
    res.send(error);
  }
};
const getGroup = async (req, res, next) => {
  const email = req.params.email;
  try {
    const result = await groupModel.find({ group_admin_email: email });
    res.status(201).send(result);
  } catch (error) {
    res.status(301).send({
      error: true,
      message: error,
    });
  }
};
const search = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;
  try {
    const response = await userModel.find().limit(limit).skip(skip);
    if (response) {
      res.status(200).send(response);
    } else {
      res.status(404).send({ message: "not found" });
    }
  } catch (error) {
    res.send(error);
  }
};
module.exports = { getUsers, getSingleUser, getGroup, estimate, search };
