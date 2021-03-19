var express = require('express');
var router = express.Router();
const userController = require('../../../../controllers/userController');
const authController = require('../../../../controllers/authController');
/* GET users listing. */
router.get('/', authController.verifyUserMiddleware, userController.userInfo.info);
router.post('/register', userController.userAuth.register);
router.post('/login', userController.userAuth.login);

router.get('/cart', authController.verifyUserMiddleware, userController.userCart.getMyCart);
router.delete('/cart', authController.verifyUserMiddleware, userController.userCart.deleteMyCart);
router.post(
    '/cart/add-product',
    authController.verifyUserMiddleware,
    userController.userCart.addToCart
);

router.get('/shops', authController.verifyUserMiddleware, userController.userOrder.getShops);
router.get(
    '/shops/products',
    authController.verifyUserMiddleware,
    userController.userOrder.getShopProducts
);
router.get(
    '/shops/subscribed',
    authController.verifyUserMiddleware,
    userController.userInfo.getSubscribedShopsDetails
);
router.post(
    '/shops/subscribe',
    authController.verifyUserMiddleware,
    userController.userInfo.subscribeShop
);
router.post(
    '/shops/unsubscribe',
    authController.verifyUserMiddleware,
    userController.userInfo.unsubscribeShop
);

router.get('/order', authController.verifyUserMiddleware, userController.userOrder.getOrders);
router.get(
    '/order/products',
    authController.verifyUserMiddleware,
    userController.userOrder.getOrderProducts
);
router.post('/order', authController.verifyUserMiddleware, userController.userOrder.placeOrder);
router.post(
    '/order/by-cart',
    authController.verifyUserMiddleware,
    userController.userOrder.placeOrderByCart
);
router.get(
    '/order/invoice',
    authController.verifyUserMiddleware,
    userController.userOrder.getInvoice
);
router.post(
    '/order/payment',
    authController.verifyUserMiddleware,
    userController.userOrder.userPayment
);

router.get('/review', authController.verifyUserMiddleware, userController.userInfo.getReviews);
router.post('/review', authController.verifyUserMiddleware, userController.userOrder.reviewProduct);
router.post(
    '/review/like',
    authController.verifyUserMiddleware,
    userController.userInfo.likeReview
);
router.post(
    '/review/dislike',
    authController.verifyUserMiddleware,
    userController.userInfo.dislikeReview
);

router.post(
    '/update/add-address',
    authController.verifyUserMiddleware,
    userController.userInfo.addAddress
);
router.post(
    '/update/location',
    authController.verifyUserMiddleware,
    userController.userInfo.addAddress
);
router.post(
    '/update/details',
    authController.verifyUserMiddleware,
    userController.userInfo.updateUserDetails
);

router.get(
    '/notifications',
    authController.verifyUserMiddleware,
    userController.userInfo.getNotifications
);

router.get(
    '/search/history/add',
    authController.verifyUserMiddleware,
    userController.userInfo.addHistory
);
router.get(
    '/search/history/delete',
    authController.verifyUserMiddleware,
    userController.userInfo.deleteHistory
);


router.post(
    '/review/add',
    authController.verifyUserMiddleware,
    userController.userOrder.reviewProduct
);
router.get('/review/like', authController.verifyUserMiddleware, userController.userInfo.likeReview);
router.get(
    '/review/dislike',
    authController.verifyUserMiddleware,
    userController.userInfo.dislikeReview
);

module.exports = router;
