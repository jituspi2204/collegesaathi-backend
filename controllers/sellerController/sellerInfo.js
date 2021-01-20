const hoc = require('../utils/hoc');
const jwtUtils = require('../utils/jwtUtils');
const firebaseAdmin = require('../utils/admin');
const Sellers = require('../../models/sellerModel');


exports.info = hoc(async (req, res,next) => {
    res.status(200).json({
        message : 'SUCCESS',
        seller : req.seller
    })
})

exports.updateLocation = hoc(async (req, res ,next) => {
    try {
        let {coordinates} = {...req.body};
        await Users.findByIdAndUpdate(req.seller._id, {
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

exports.updateSellerDetails = hoc(async (req, res ,next) => {
    try {
        let {updatedDetails} = {...req.body};
        await Sellers.findByIdAndUpdate(req.seller._id, {
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