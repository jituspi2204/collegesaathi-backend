const hoc = require('../utils/hoc');
const jwtUtils = require('../utils/jwtUtils');
const firebaseAdmin = require('../utils/admin');
const Sellers = require('../../models/sellerModel');
// const Seller = require('../../models/sellerModel');

exports.register = hoc(async (req ,res,next) => {
    const {name , image , email,address,location,shopName,phoneNumber,uid} = {
        ...req.body
    };

    try {
        let isVerified = await firebaseAdmin.checkUser(phoneNumber, uid);
        if(isVerified){
            let seller = await Sellers.create({
                name,image,email,address,location,shopName,phoneNumber
            })
            let token = await jwtUtils.createToken({phoneNumber, _id : seller._id});
            res.status(200).json({
                message : 'SUCCESS',
                token,
                seller
            })
        }else{
            res.status(401).json({
                message : 'UNAUTHORIZED_USER'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : 'SERVER_ERROR'
        })
    }
})

exports.login = hoc(async (req,res,next) => {
    const {phoneNumber , uid} = {...req.body};
    try {
        let isVerified = await firebaseAdmin.checkUser(phoneNumber, uid);
        console.log("--",isVerified);
        if(isVerified){
            let seller = await Sellers.findOne({phoneNumber});
            if(seller){
                let token = await jwtUtils.createToken({phoneNumber , _id : seller._id});
                res.status(200).json({
                    message : 'SUCCESS',
                    token,
                    seller
                })
            }else{
                res.status(404).json({
                    message : 'USER_NOT_FOUND'
                })
            }
        }else{
            res.status(401).json({
                message : 'UNAUTHORIZED_USER'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({
            message : 'UNAUTHORIZED_USER'
        })
    }
});


exports.verifySeller = hoc(async(req, res ,next) => {
    res.status(200).json({
        message : 'SUCCESS',
    })
})





