require('dotenv').config();

const jwtConfig={
    JWT_SECRET_KEY:process.env.JWT_SECRET_KEY||'your-secret-key'
}
module.exports=jwtConfig;