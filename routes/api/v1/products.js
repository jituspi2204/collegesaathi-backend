var express = require('express');
var router = express.Router();
const productController = require('../../../controllers/productController');

/* GET users listing. */
router.get('/search', productController.getProduct);
router.get('/seller-products',productController.sellerProducts);


module.exports = router;
