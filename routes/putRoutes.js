const express = require("express");
const { updateUser,addToGroup,removeFromGroup } = require("../controller/Put.controller");
const router = express.Router();
//compleated
router.put("/updateusers/", updateUser);
//compleated
router.put("/addToGroup",addToGroup)
//compleated
router.put("/removeFromGroup",removeFromGroup)
module.exports = router;
