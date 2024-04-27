const jwt = require('jsonwebtoken');
const secret = "@125abhay#116$$"
function setUser(user){
    return jwt.sign({
        _id:user._id,
        email:user.email,
    },secret);
}
function getUser(uid){
    if(!uid) return  null;
    try{
        return  jwt.verify(uid,secret)
    }catch(err){
        console.log('galat token dala re tune')
        return err;
    }
}
module.exports = {
    setUser,
    getUser,
}