const admin = require('firebase-admin');


exports.checkUser = async (phoneNubmer , uid) => {
    return true;
    try {
        let details = await admin.auth().getUserByPhoneNumber(phoneNubmer)
        if(details.uid === uid){
            console.log("in");
            return true;
        }else{
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
   
}