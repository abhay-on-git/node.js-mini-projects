const jwt = require('jsonwebtoken');
const secret = "@125abhay#116$$"
function setUser(user){
    return jwt.sign({
        _id:user._id,
        email:user.email,
        role:user.role,
    },secret);
}
  function getUser(uid){
    if(!uid) return  null;
    try{
        return jwt.verify(uid,secret)
    }catch(err){
        console.log('galat token dala re tune')
        throw new Error('Invalid Signture');
    }
}
module.exports = {
    setUser,
    getUser,
}