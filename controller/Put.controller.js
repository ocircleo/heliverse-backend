const { groupModel } = require("../model/groupSchema");
const { userModel } = require("../model/userSchema");
const bcrypt = require("bcrypt");
const updateUser = async (req, res, next) => {
  let body = req.body;
  const id = body._id;
  delete body._id;
  const user = await userModel.findOne({ _id: id });
  //if password is also being updated
  if (body.newpassword) {
    bcrypt.compare(body.oldpassword, user.password, function (err, result) {
      //if password matches
      if (result) {
        bcrypt.hash(req.body.newpassword, 10, async function (err, hash) {
          const newUser = {
            ...req.body,
            password: hash,
          };
          try {
            const newresult = await userModel.findByIdAndUpdate(
              { _id: id },
              { $set: newUser },
              { new: true }
            );
            res.status(201).send(newresult);
          } catch (error) {
            res.status(301).send({
              error: error,
              message: "Failed to updated",
            });
          }
        });
      } else {
        res.send({
          status: 404,
          message: "Wrong password",
        });
      }
    });
    return;
  }
  try {
    const result = await userModel.findByIdAndUpdate(
      { _id: id },
      { $set: body },
      { new: true }
    );
    res.status(201).send(result);
  } catch (error) {
    res.status(301).send({
      error: error,
      message: "Failed to updated",
    });
  }
};
const addToGroup = async (req, res, next) => {
  const id = req.body.id;
  const users = req.body.newmembers;
  try {
    const result = await groupModel.findByIdAndUpdate(
      { _id: id },
      { $addToSet: { members: { $each: users } } },
      { new: true }
    );
    res.status(201).send(result);
  } catch (error) {
    res.send({
      error: true,
      message: error,
    });
  }
};
const removeFromGroup = async (req, res, next) => {
  const id = req.body._id;
  const userId = req.body.userId;
  try {
    const result = await groupModel.findByIdAndUpdate(
      { _id: id },
      {
        $pull: { members: userId },
      },
      { new: true }
    );
    res.status(201).send(result);
  } catch (error) {
    res.send({
      error: true,
      message: error,
    });
  }
};
module.exports = {
  updateUser,
  addToGroup,
  removeFromGroup,
};
