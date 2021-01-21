var express = require('express');
var router = express.Router();
const seller = require('../../../controllers/sellerController');
const authMiddlerware = require('../../../controllers/authController');

/* GET users listing. */
router.get('/', authMiddlerware.verifySellerMiddleware, seller.sellerInfo.info);
router.get('/verify-seller', authMiddlerware.verifySellerMiddleware,seller.sellerAuth.verifySeller);
router.post('/register', seller.sellerAuth.register);
router.post('/login', seller.sellerAuth.login);
router.get('/my-products', authMiddlerware.verifySellerMiddleware,seller.sellerCart.getAllProducts);
router.post('/add-product',authMiddlerware.verifySellerMiddleware,seller.sellerCart.addProduct);
router.post('/update-product', authMiddlerware.verifySellerMiddleware,seller.sellerCart.updateProduct);
router.post('/delete-product',authMiddlerware.verifySellerMiddleware, seller.sellerCart.deleteProduct);
router.post('/update-location', authMiddlerware.verifySellerMiddleware,seller.sellerInfo.updateLocation);
router.post('/update-details', authMiddlerware.verifySellerMiddleware,seller.sellerInfo.updateSellerDetails);

module.exports = router;
