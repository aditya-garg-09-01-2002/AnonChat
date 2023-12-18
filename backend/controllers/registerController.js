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
exports.checkUser=async(req,res)=>{
    const {UserID}=req.body;
    try {
        const results = await dbUtils.query(
        'Select name from User where UserID=?',
        [UserID]
        );
        console.log(results);
        if(results.length>0)
            res.json({'message':'User Already Exists'})
        else 
            res.json({'message':'User Does Not Exists'})
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
exports.forgotPassword=async(req,res)=>{
    const { UserID, UserPassword } = req.body;
    // frontend must send a prop of body with all required attributes

  // Hash the password
  const hashedPassword = await bcrypt.hash(UserPassword, 10);
    try {
        const results = await dbUtils.query(
        'Update User set Password=? where UserID=?',
        [hashedPassword, UserID ]
        );
        if(results.affectedRows===1)
            res.json({ success: true });
        else res.status(404).json({success:false,error:"User Does Not Exists"})
    } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}