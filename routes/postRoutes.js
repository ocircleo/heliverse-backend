const express = require("express");
const {
  register,
  login,
  makegroup,
  autoLogin,
} = require("../controller/Post.controller");
const verifyJwt = require("../model/Jwt");
const router = express.Router();
//compleated
router.post("/register", register);
//compleated
router.post("/login", login);
//compleated
router.post("/makegroup", makegroup);
//
router.post("/autoLogin", verifyJwt, autoLogin);
module.exports = router;
