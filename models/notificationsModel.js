const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notificationsSchema = Schema({
    senderName : {
        type : String,
        required : true
    },
    recieverId : {
        type : Schema.Types.ObjectId,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    message : {
        type : String,
        required : true
    },
	createdAt: {
		type: mongoose.Schema.Types.Date,
		default: new Date(Date.now())
	},
	updatedAt: {
		type: mongoose.Schema.Types.Date,
		default: new Date(Date.now())
	}
});

const Notification = mongoose.model('Notification', notificationsSchema);
module.exports = Notification;