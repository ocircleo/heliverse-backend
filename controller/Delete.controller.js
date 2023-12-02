const { userModel } = require("../model/userSchema");

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await userModel.deleteOne({ _id: id });
    res.send({
      succes: true,
      message: `deleted ${id}`,
      data: result,
    });
  } catch (error) {
    res.send({
      error: true,
      message: error,
    });
  }
};
module.exports = {
  deleteUser,
};
