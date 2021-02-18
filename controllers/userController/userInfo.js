const hoc = require('../utils/hoc');
const jwtUtils = require('../utils/jwtUtils');
const firebaseAdmin = require('../utils/admin');
const Users = require('../../models/userModel');
const Notification = require('../../models/notificationsModel');
const User = require('../../models/userModel');
const Seller = require('../../models/sellerModel');
const Review = require('../../models/reviewModel');


exports.info = hoc(async (req, res,next) => {
    res.status(200).json({
        message : 'SUCCESS',
        user : req.user
    })
})

exports.banners = hoc(async (req, res,next) => {
    res.status(200).json({
        message : 'SUCCESS',
        banners : ['bn-0.jpg','bn-1.jpg','bn-2.jpg']
    })
})

exports.getReviews = hoc(async (req, res,next) => {
    try {
        let reviews = await Review.find({userId : req.user._id})
        res.status(200).json({
            message : 'SUCCESS',
            reviews
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "SERVER_ERROR"
        })
    }
})


exports.addAddress = hoc(async (req, res ,next) => {
    try {
        let {address} = {...req.body};
        await Users.findByIdAndUpdate(req.user._id, {
           $addToSet : {address : address}
        });
        res.status(200).json({
            message : "SUCCESS"
        })
    } catch (error) {
        res.status(500).json({
            message : "SERVER_ERROR"
        })
    }
})


exports.updateLocation = hoc(async (req, res ,next) => {
    try {
        let {coordinates} = {...req.body};
        await Users.findByIdAndUpdate(req.user._id, {
            'location.coordinates' : coordinates
        });
        res.status(200).json({
            message : "SUCCESS"
        })
    } catch (error) {
        res.status(500).json({
            message : "SERVER_ERROR"
        })
    }
})


exports.updateUserDetails = hoc(async (req, res ,next) => {
    try {
        let {updatedDetails} = {...req.body};
        await Users.findByIdAndUpdate(req.user._id, {
           ...updatedDetails
        });
        res.status(200).json({
            message : "SUCCESS"
        })
    } catch (error) {
        res.status(500).json({
            message : "SERVER_ERROR"
        })
    }
})


exports.getNotifications = hoc(async (req, res ,next) => {
    try {
        let notifications = await Notification.find({recieverId : req.user._id});
        res.status(200).json({
            message : "SUCCESS",
            notifications
        })
    } catch (error) {
        res.status(500).json({
            message : "SERVER_ERROR"
        })
    }
})


exports.deleteNotifications = hoc(async (req, res ,next) => {
    try {
        let notifications = await Notification.deleteMany({recieverId : req.user._id});
        res.status(200).json({
            message : "SUCCESS",
            notifications
        })
    } catch (error) {
        res.status(500).json({
            message : "SERVER_ERROR"
        })
    }
})
exports.getSubscribedShopsDetails = hoc(async (req, res ,next) => {
    try {
        let ss = req.user.subscribedShops;
        let shops = await Seller.find({_id : {$in : ss}},{shopName : 1,address : 1,phoneNumber : 1,image : 1})
        res.status(200).json({
            message : "SUCCESS",
            shops
        })
    } catch (error) {
        res.status(500).json({
            message : "SERVER_ERROR"
        })
    }
})

exports.subscribeShop = hoc(async (req, res ,next) => {
    const {sellerId} = {...req.query};
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $addToSet : {subscribedShops : sellerId}
        });
        res.status(200).json({
            message : "SUCCESS",
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "SERVER_ERROR"
        })
    }
})

exports.unsubscribeShop = hoc(async (req, res ,next) => {
    const {sellerId} = {...req.query};
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull : {subscribedShops : sellerId}
        });
        res.status(200).json({
            message : "SUCCESS",
        })
    } catch (error) {
        res.status(500).json({
            message : "SERVER_ERROR"
        })
    }
})
exports.addHistory = hoc(async (req, res ,next) => {
    const {s} = {...req.query};
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $addToSet : {searchHistory : s}
        });
        res.status(200).json({
            message : "SUCCESS",
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "SERVER_ERROR"
        })
    }
})

exports.deleteHistory = hoc(async (req, res ,next) => {
    const {s} = {...req.query};
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull : {searchHistory : s}
        });
        res.status(200).json({
            message : "SUCCESS",
        })
    } catch (error) {
        res.status(500).json({
            message : "SERVER_ERROR"
        })
    }
})

exports.likeReview = hoc(async (req, res,next) => {
    try {
        let id = req.query.id;
        await Review.findByIdAndUpdate(id , {
            $addToSet : {liked : req.user._id}
        })
        res.status(200).json({
            message : 'SUCCESS',
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "SERVER_ERROR"
        })
    }
})

exports.dislikeReview = hoc(async (req, res,next) => {
    try {
        let id = req.query.id;
        await Review.findByIdAndUpdate(id , {
            $addToSet : {disliked : req.user._id}
        })
        res.status(200).json({
            message : 'SUCCESS',
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : "SERVER_ERROR"
        })
    }
})