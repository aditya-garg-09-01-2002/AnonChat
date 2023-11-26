// controllers/userController.js
const dbUtils = require('../utils/dbUtils');
const bcrypt=require('bcrypt')
// Controller function to get all users
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
            res.status(200).json({ message: 'Login Successful' });
      } else {
        // Invalid password
        res.status(401).json({ message: 'Invalid password' });
      }
    } else {
      // User not found
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
