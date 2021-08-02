var express = require('express');
var router = express.Router();
var student = require('./student');

//students routes
router.use('/student', student);

module.exports = router;
