var express = require('express');
var router = express.Router();
const {showData} = require('../controller/userController')
/* GET home page. */
router.get('/', showData);

module.exports = router;
