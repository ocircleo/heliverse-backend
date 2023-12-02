const { groupModel } = require("../model/groupSchema");
const { userModel } = require("../model/userSchema");

const getUsers = async (req, res, next) => {
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
    const result = groupModel.findOne({ group_admin_email: email });
    res.status(201).send(result);
  } catch (error) {
    res.status(301).send({
      error: true,
      message: error,
    });
  }
};
module.exports = { getUsers, getSingleUser, getGroup };
