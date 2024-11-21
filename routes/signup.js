var express = require('express');
const {signup} = require('../controller/userController')
var router = express.Router();

router.post('/', signup);

module.exports = router;
