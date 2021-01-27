var express = require('express');
var router = express.Router();
const productController = require('../../../controllers/productController');
const addProduct = require('../../../addData');
/* GET users listing. */
router.get('/search', productController.getProduct);
router.get('/add-to-cart', addProduct.addToCart);
router.get('/seller-products',productController.sellerProducts);


module.exports = router;
