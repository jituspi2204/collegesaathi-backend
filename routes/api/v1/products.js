var express = require('express');
var router = express.Router();
const productController = require('../../../controllers/productController');
const addProduct = require('../../../addData');
const { route } = require('./sellers');
/* GET users listing. */
router.get('/search', productController.getProduct);
router.get('/search-id', productController.getProductById);
router.get('/search-barcode', productController.getProductByBarcode);
router.get('/add-to-cart', addProduct.temp);
router.get('/seller-products',productController.sellerProducts);
router.get('/seller-cart',productController.sellerCart);
router.get('/seller-cart/id',productController.getSellerProductById);
router.get('/reviews',productController.getReviews);
router.get('/recommendations',productController.userRecommendations);



module.exports = router;
