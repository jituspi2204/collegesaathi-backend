const admin = require('firebase-admin');


exports.checkUser = async (email , uid) => {
    try {
        let details = await admin.auth().getUserByEmail(email);
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
