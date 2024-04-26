const sessionIdToUserMap =  new Map();
function setUser(sessionId , user){
    return sessionIdToUserMap.set(sessionId,user);
}
function getUser(sessionId){
    return  sessionIdToUserMap.get(sessionId)
}
module.exports = {
    setUser,
    getUser,
}