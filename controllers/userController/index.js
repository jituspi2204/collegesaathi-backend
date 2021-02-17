const userAuth = require('./userAuth');
const userInfo = require('./userInfo');
const userCart = require('./userCart');
const userOrder = require('./userOrder');
const hoc = require('../utils/hoc');
const jwtUtils = require('../utils/jwtUtils');
const firebaseAdmin = require('../utils/admin');
const Users = require('../../models/userModel');
const Notification = require('../../models/notificationsModel');
const User = require('../../models/userModel');
const Seller = require('../../models/sellerModel');

const userOffers = hoc(async (req, res,next) => {
    res.status(200).json({
        message : 'SUCCESS',
        myOffers : req.user.offers
    })
})


const userUtils = {
    userOffers
}


module.exports = {userAuth,userInfo,userCart,userOrder,userUtils};

