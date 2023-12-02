const express = require("express");
const { getUsers, getSingleUser,getGroup } = require("../controller/Get.controller");
const router = express.Router();
//compleated
router.get("/users", getUsers);
//compleated
router.get("/users/:id", getSingleUser);
//
router.get("/group/:email",getGroup);
module.exports = router;
