const express = require("express");
const { register,login,makegroup } = require("../controller/Post.controller");
const router = express.Router();
//compleated
router.post("/register", register);
//compleated
router.post("/login",login)
//compleated
router.post('/makegroup',makegroup)
module.exports = router;
