const jwt=require('jsonwebtoken');
const jwtConfig=require('../config/jwt');

const getJWT=(allCookies)=>{
    const encoded_jwtToken=allCookies[jwtConfig.JWT_COOKIE_NAME];
    if(!encoded_jwtToken)
        return {authorized:false};
    const decoded_jwtToken=jwt.verify(encoded_jwtToken,jwtConfig.JWT_SECRET_KEY)
    return {
        authorized:true,
        userName:decoded_jwtToken.UserName,
        userRole:decoded_jwtToken.UserRole,
        userName:decoded_jwtToken.UserName,
        userID:decoded_jwtToken.UserID,
        roomID:decoded_jwtToken.RoomID,
    };
}
module.exports=getJWT