const express = require("express");
const { deleteUser } = require("../controller/Delete.controller");
const router = express.Router();
router.delete("/users/:id", deleteUser);
module.exports = router;
