var express = require('express');
const {deleteUser} = require('../controller/userController')
var router = express.Router();

router.delete('/:id', deleteUser);

module.exports = router;