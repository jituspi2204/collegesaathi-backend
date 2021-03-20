var express = require('express');
var router = express.Router();
const transporterController = require('../../../../controllers/transporterController');
const authController = require('../../../../controllers/authController');
/* GET users listing. */
router.get(
    '/',
    authController.verifyTransporterMiddleware,
    transporterController.transpoterInfo.info
);
router.get(
    '/verify-user',
    authController.verifyTransporterMiddleware,
    transporterController.transpoterAuth.verifyUser
);
router.post('/login', transporterController.transpoterAuth.login);
router.post('/register', transporterController.transpoterAuth.register);
router.get(
    '/orders',
    authController.verifyTransporterMiddleware,
    transporterController.transpoterOrders.getAllOrders
);
router.get(
    '/orders/details',
    authController.verifyTransporterMiddleware,
    transporterController.transpoterOrders.getOrdersByOrderId
);
router.get(
    '/orders/products',
    authController.verifyTransporterMiddleware,
    transporterController.transpoterOrders.getOrderProducts
);
router.post(
    '/orders/update',
    authController.verifyTransporterMiddleware,
    transporterController.transpoterOrders.updateOrder
);
router.get(
    '/notifications',
    authController.verifyTransporterMiddleware,
    transporterController.transpoterInfo.getNotifications
);
router.delete(
    '/notifications',
    authController.verifyTransporterMiddleware,
    transporterController.transpoterInfo.deleteNotifications
);

module.exports = router;
