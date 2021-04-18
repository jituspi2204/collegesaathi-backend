const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notificationsSchema = Schema({
    // senderName: {
    //     type: String,
    //     // required: true,
    // },
    // recieverId: {
    //     type: Schema.Types.ObjectId,
    //     // required: true,
    // },
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