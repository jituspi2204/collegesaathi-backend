const hoc = require('../utils/hoc');
const jwtUtils = require('../utils/jwtUtils');
const firebaseAdmin = require('../utils/admin');
const Transporter = require('../../models/transporterModel');

exports.info = hoc(async (req, res,next) => {
    res.status(200).json({
        message : 'SUCCESS',
        transporter : req.user
    })
})
