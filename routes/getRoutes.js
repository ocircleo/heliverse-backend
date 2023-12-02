const express = require("express");
const { getUsers, getSingleUser,getGroup,estimate } = require("../controller/Get.controller");
const router = express.Router();
//compleated
router.get("/estimate",estimate)
//compleated
router.get("/users", getUsers);
//compleated
router.get("/users/:id", getSingleUser);
//
router.get("/group/:email",getGroup);
module.exports = router;
