const hoc = require('../utils/hoc');
const jwtUtils = require('../utils/jwtUtils');
const firebaseAdmin = require('../utils/admin');
const Users = require('../../models/userModel');


exports.register = hoc(async (req ,res,next) => {
    const {name , image , email,address,location,phoneNumber,uid} = {
        ...req.body
    };

    try {
        let isVerified = await firebaseAdmin.checkUser(phoneNumber, uid);
        if(isVerified){
            let user = await Users.create({
                name,image,email,address,location,phoneNumber,userCart : [],userOrders : []
            })
            // console.log(user);
            let token = await jwtUtils.createToken({phoneNumber, _id : user._id});
            res.status(200).json({
                message : 'SUCCESS',
                token,
                user
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
        console.log(isVerified);
        if(isVerified){
            let user = await Users.findOne({phoneNumber});
            if(user){
                let token = await jwtUtils.createToken({phoneNumber , _id : user._id});
                res.status(200).json({
                    message : 'SUCCESS',
                    token,
                    user
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
        res.status(401).json({
            message : 'UNAUTHORIZED_USER'
        })
    }
});

exports.verifyUser = hoc(async(req, res ,next) => {
    res.status(200).json({
        message : 'SUCCESS',
    })
})



