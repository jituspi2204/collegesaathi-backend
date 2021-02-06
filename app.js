var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var dotenv = require('dotenv');
dotenv.config({path : './config.env'});
var mongoose = require('mongoose');
var bills = require('./utils/createBill');
mongoose.connect(process.env.DATABASE,{
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
}).then(res => {
  console.log("Connected To Datebase");
}).catch(err => { 
  console.log("Database Error : " ,err);
})



//firebase admin



var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.send('Error');
});

// app.listen(3000,() => {
  //   console.log("Server");
  //   new bills({
    //     uadderss  : {address : "Aditya Apartment ambherahia village sector 19 dwarka",city : "Delhi" ,state : "Delhi", pincode : "110075"},
    //     address  : {address : "Aditya Apartment ambherahia village sector 19 dwarka",city : "Delhi" ,state : "Delhi", pincode : "110075"},
    //     b_name : "Ram mohan sharma",
    //     shopName : "Sharma Kirana Store",
    //     products : [
//       {
//         "amount": 218,
//         "method": "COD",
//         "createdAt": "2021-01-28T19:10:38.624Z",
//         "updatedAt": "2021-01-28T19:10:38.624Z",
//         "_id": "60130dee7de0054af422a32e",
//         "orderId": "1611861486446",
//         "sellerId": "600ec314e383050015f71cee",
//         "title": "Aashirvaad Atta - Whole Wheat, 10 kg Pouch ",
//         "price": 110,
//         "discount": 1,
//         "quantity": 2,
//     },
//     ]

//   }).generateBill()
// })

module.exports = app;
