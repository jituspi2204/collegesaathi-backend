var express = require('express');
var router = express.Router();
const seller = require('../../../../controllers/sellerController');
const authMiddlerware = require('../../../../controllers/authController');

/* GET sellers listing. */
router.get('/', authMiddlerware.verifySellerMiddleware, seller.sellerInfo.info);
router.post('/register', seller.sellerAuth.register);
router.post('/login', seller.sellerAuth.login);

router.get('/cart', authMiddlerware.verifySellerMiddleware, seller.sellerCart.getProduct);
router.delete('/cart', authMiddlerware.verifySellerMiddleware, seller.sellerCart.deleteProduct);
router.post(
    '/cart/add-product',
    authMiddlerware.verifySellerMiddleware,
    seller.sellerCart.addProduct
);
router.post(
    '/cart/update-product',
    authMiddlerware.verifySellerMiddleware,
    seller.sellerCart.updateProduct
);

router.post(
    '/update/location',
    authMiddlerware.verifySellerMiddleware,
    seller.sellerInfo.updateLocation
);
router.post(
    '/update/details',
    authMiddlerware.verifySellerMiddleware,
    seller.sellerInfo.updateSellerDetails
);

router.get('/order', authMiddlerware.verifySellerMiddleware, seller.sellerOrder.getAllOrders);
router.post(
    '/order/packed',
    authMiddlerware.verifySellerMiddleware,
    seller.sellerOrder.updateOrder
);
module.exports = router;
