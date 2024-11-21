var express = require('express');
const {editUser} = require('../controller/userController')
var router = express.Router();

router.put('/:id', editUser);

module.exports = router;