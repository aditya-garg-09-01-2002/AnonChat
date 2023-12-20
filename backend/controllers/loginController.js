// controllers/userController.js
const dbUtils = require('../utils/dbUtils');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const jwtConfig=require('../config/jwt')

exports.logout= (req, res) => {
  res.clearCookie(jwtConfig.JWT_COOKIE_NAME);

  try {
    req.session.destroy((err) => {
      if (err) 
        res.status(500).json({message:'Internal Server Error'});
      else 
        res.status(200).json({message:'Successfully Logged Out!!!'});
    });
  } catch (error) {
    res.status(500).json({message:'Internal Server Error'});
  }
  
};


exports.validateLogin = async (req, res) => {
  const { UserID, UserPassword } = req.body;
  try {
    const rows = await dbUtils.query('SELECT * FROM user WHERE UserID = ?', [UserID]);
    if (rows.length > 0) {
        const hashedPassword = rows[0].Password;
        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(UserPassword, hashedPassword);
        if (isPasswordValid) {
            // Successful login
            const jwtToken=jwt.sign({User:UserID},jwtConfig.JWT_SECRET_KEY,{expiresIn:'1d',});
            res.cookie('jwt',jwtToken,{
              httpOnly:true,//maybe this
              sameSite:'none',
              maxAge: 24 * 60 * 60 * 1000,
              // secure:true
            });
            req.session.user={
              UserID:UserID,
              jwtToken
            }
            res.status(200).json({ message: 'Login Successful'});
      } else {
        // Invalid password
        res.status(401).json({ message: 'Invalid Password' });
      }
    } else {
      // User not found
      res.status(404).json({ message: 'User Not Found' });
    }
  } catch (error) {
    // console.log(error)
    res.status(500).json({ message: error.message });
  }
};
