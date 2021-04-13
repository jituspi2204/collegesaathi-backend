var express = require('express');
const { route } = require('../..');
var router = express.Router();
var users = require('./users');
var sellers = require('./sellers');
var products = require('./products');
var transporter = require('./transporters');
var student = require('./student')

var {arr} = require('../../../io')
/* GET users listing. */
function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
 
router.get('/', (req,res) => {
    try {
        var io = req.app.get('socketio');
        io.to(110075).emit('provideLocation', 'Provide');
        res.send("done");
    } catch (error) {
        console.log(error);
    }
})
router.get('/calc', (req,res) => {
    try {
        let d = getDistanceFromLatLonInKm(28.00000000,74.000000, 28.000001,74.000000);
        res.send(d + "");
    } catch (error) {
        console.log(error);
    }
})
// router.use('/users',users);
// router.use('/sellers',sellers);
// router.use('/products' ,products);
// router.use('/transporters', transporter);
router.use('/student', student)



module.exports = router;
