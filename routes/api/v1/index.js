var express = require('express');
const { route } = require('../..');
var router = express.Router();
var users = require('./users');
var sellers = require('./sellers');
var products = require('./products');
/* GET users listing. */
router.get('/', (req,res) => {
    res.status(200).send('Welocme to api v1');
})
router.use('/users',users);
router.use('/sellers',sellers);
router.use('/product' ,products);

module.exports = router;
