const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationsSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    by: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    url : {
        type: String,
        default : '',
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: new Date(Date.now()),
    },
    time: {
        type: mongoose.Schema.Types.Date,
        default: new Date(Date.now()),
    },

});

const Notification = mongoose.model('notification', notificationsSchema);
module.exports = Notification;