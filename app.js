var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var addData = require('./addData');
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var pdff = require('html-pdf-node')
var createBill = require('./utils/createMilkBill');
// const createResume = require('./')
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    max: 500,
    windowMs: 1000 * 60 * 60,
    message: 'try after 1 hour',
});

// var pdfparse = require('pdf-parse');
// const fs = require('fs');
// let dataBuffer = fs.readFileSync('./it_2021.pdf');

const cors = require('cors');
var dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
var mongoose = require('mongoose');
var bills = require('./utils/createBill');
mongoose
    .connect(process.env.DATABASE, {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
    })
    .then((res) => {
        console.log('Connected To Datebase');
    })
    .catch((err) => {
        console.log('Database Error : ', err);
    });

//firebase admin
const Subject = require('./models/subjectsModel');
var admin = require('firebase-admin');
var serviceAccount = require('./serviceAccountKey.json');
const Student = require('./models/studentModel');
const Semester = require('./models/semesterModel');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const getPoint = {
    O: 10,
    'A+': 9,
    A: 8,
    'B+': 7,
    B: 6,
    C: 5,
    P: 4,
    F: 0,
    '': 0,
    null: 0,
    undefined: 0,
};

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/', limiter);
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    console.log(err);
    res.status(err.status || 500);
    res.send('Error');
});
app.listen(3000,() => {
    new createBill({
        dairyName: 'Sharma Dairy',
        address: '5/27 Trimurti nagar chand mari',
        phoneNumber: '+918851972643',
        userName: 'Chetan Kumar Sharma',
        userPhoneNumber: '+918228744671',
        userAddress: 'Suraksha vihar police colony aligarh',
        totalAmount: 300,
        totalMilk: 5,
        rate: 60,
        milk: { 1: 1, 5: 1, 8: 16, 21: 1, 31: 1 },
        status: 'Not Paid',
        month: 'June',
        year: 2021,
        billno : "fafasdfasfasdf"
    }).generateBill();
})
module.exports = app;
