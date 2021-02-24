var express = require('express');
var router = express.Router();
const userController = require('../../../controllers/userController');
const authController = require('../../../controllers/authController');
/* GET users listing. */
router.get('/',authController.verifyUserMiddleware,userController.userInfo.info);
router.get('/verify-user', authController.verifyUserMiddleware,userController.userAuth.verifyUser);
router.post('/login', userController.userAuth.login);
router.get('/banners',userController.userInfo.banners);
router.post('/register',userController.userAuth.register);
router.post('/update-location',authController.verifyUserMiddleware,userController.userInfo.updateLocation);
router.post('/add-address',authController.verifyUserMiddleware,userController.userInfo.addAddress);
router.post('/update-details' ,authController.verifyUserMiddleware,userController.userInfo.updateUserDetails);
router.get('/cart',authController.verifyUserMiddleware,userController.userCart.getMyCart);
router.post('/cart/add',authController.verifyUserMiddleware,userController.userCart.addToCart);
router.post('/cart/update',authController.verifyUserMiddleware,userController.userCart.updateMyCart);
router.post('/cart/delete',authController.verifyUserMiddleware,userController.userCart.deleteMyCart);
router.get('/order',authController.verifyUserMiddleware,userController.userOrder.getOrders);
router.post('/order',authController.verifyUserMiddleware,userController.userOrder.placeOrder);
router.post('/order/by-cart',authController.verifyUserMiddleware,userController.userOrder.placeOrderByCart);
router.get('/shops',authController.verifyUserMiddleware,userController.userOrder.getShops);
router.get('/shop-items',authController.verifyUserMiddleware,userController.userOrder.getShopProducts);
router.get('/notifications', authController.verifyUserMiddleware,userController.userInfo.getNotifications);
router.delete('/notifications', authController.verifyUserMiddleware,userController.userInfo.deleteNotifications);
router.get('/reviews', authController.verifyUserMiddleware,userController.userOrder.reviewProduct);
router.post('/review', authController.verifyUserMiddleware,userController.userOrder.reviewProduct);
router.get('/order/download', authController.verifyUserMiddleware,userController.userOrder.getInvoice);
router.get('/subscribed-shops', authController.verifyUserMiddleware,userController.userInfo.getSubscribedShopsDetails);
router.get('/subscribe-shop', authController.verifyUserMiddleware,userController.userInfo.subscribeShop);
router.get('/unsubscribe-shop', authController.verifyUserMiddleware,userController.userInfo.unsubscribeShop);
router.get('/search-history', authController.verifyUserMiddleware,userController.userInfo.addHistory);
router.delete('/search-history', authController.verifyUserMiddleware,userController.userInfo.deleteHistory);
router.get('/review/like', authController.verifyUserMiddleware,userController.userInfo.likeReview);
router.get('/review/dislike', authController.verifyUserMiddleware,userController.userInfo.dislikeReview);
router.get('/saved-cards', authController.verifyUserMiddleware,userController.userInfo.savedCards);
router.post('/payment', authController.verifyUserMiddleware,userController.userOrder.userPayment);


module.exports = router;
