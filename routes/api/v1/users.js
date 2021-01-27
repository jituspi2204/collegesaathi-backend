var express = require('express');
var router = express.Router();
const userController = require('../../../controllers/userController');
const authController = require('../../../controllers/authController');
/* GET users listing. */
router.get('/',authController.verifyUserMiddleware,userController.userInfo.info);
router.get('/verify-user', authController.verifyUserMiddleware,userController.userAuth.verifyUser);
router.post('/login', userController.userAuth.login);
router.post('/register',userController.userAuth.register);
router.post('/update-location',authController.verifyUserMiddleware,userController.userInfo.updateLocation);
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


module.exports = router;
