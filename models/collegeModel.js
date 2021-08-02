var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    name: {
        type: String,
        required : true
    },
    id: {
        type: Number,
        required : true
    },
    address: {
        type: String,
        default : 'address'
    }
});

const College = mongoose.model('college', userSchema);
module.exports = College;
