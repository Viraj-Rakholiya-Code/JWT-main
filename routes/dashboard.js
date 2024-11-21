const express = require("express");
const router = express.Router();
const { dashboard } = require('../controller/userController');

router.get('/', dashboard);

module.exports = router;