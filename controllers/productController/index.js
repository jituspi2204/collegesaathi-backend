const Product = require('../../models/productModel');
const hoc = require('../utils/hoc');


exports.getProduct = hoc(async (req,res,next) => {
    try {
        let {s} = {...req.query};
        let rgx = new RegExp(`.${s}.` , 'ig');
        let list = await Product.find({title : {$in: [ rgx]} });
        res.status(200).json({
            message : 'SUCCESS',
            list
        })
    } catch (error) {
        res.status(500).json({
            message : "SERVER_ERROR"
        })
    }
})