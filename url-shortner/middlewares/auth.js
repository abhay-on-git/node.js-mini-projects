const {getUser} = require('../services/auth')
async function restrictToLoggedInUsersOnly(req,res,next){
    const userUid = req.cookies.uid;
    console.log('inside restrictToLoggedInUsersOnly')
    if(!userUid) return res.redirect('/login')
    const user = getUser(userUid);

    if(!user) res.redirect('/login');
    console.log('got the user')
     req.user = user;
      next();
}
async function checkAuth(req,res,next){
    const userUid = req.cookies.uid;
    const user = getUser(userUid);
    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedInUsersOnly,
    checkAuth
}