var express = require("express");
var router = express.Router();
const { login } = require("../controller/userController");
/* GET users listing. */
router.post("/", login);

module.exports = router;
