// controllers/userController.js
const dbUtils = require('../utils/dbUtils');
const bcrypt = require('bcrypt');
// Controller function to get all users
exports.addUser = async (req, res) => {
    const { UserID, UserName, UserPassword } = req.body;
    // frontend must send a prop of body with all required attributes

  // Hash the password
  const hashedPassword = await bcrypt.hash(UserPassword, 10);
    try {
        const results = await dbUtils.query(
        'INSERT INTO user (UserID, Password, Name) VALUES (?, ?, ?)',
        [UserID, hashedPassword, UserName]
        );
        res.json({ success: true, userId: results.insertId });
    } catch (error) {
        if(error.errno==1062)
        {
            res.status(500).json({success:false,error:'User Already Exists'});
        }
        // console.error('Error inserting user:', error);
        else
        {
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    }
};