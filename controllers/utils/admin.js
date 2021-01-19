const admin = require('firebase-admin');


exports.checkUser = (phoneNubmer , uid) => {
    admin.auth().getUserByPhoneNumber(phoneNubmer)
    .then(details => {
        if(details.uid === uid){
            return true;
        }else{
            return false;
        }
    }).catch(err => {
        console.log(err);
        return false;
    })
}