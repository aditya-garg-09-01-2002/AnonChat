// controllers/userController.js
const dbUtils = require('../utils/dbUtils');
const bcrypt = require('bcrypt');
const transporter=require('../utils/mailUtils')

exports.sendOTP=async (req,res)=>{
    const {UserID} = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);
    try
    {
        const result = await transporter.sendMail({
            from:"guufg57@gmail.com",
            to: UserID,
            subject: 'Email Verification OTP',
            text: `Your OTP for email verification is: ${otp}`,
        });
        console.log(result);
        if (result.accepted && result.accepted.length > 0) {
            // Email sent successfully
            res.json({ 'status': 'success', 'message': 'OTP sent successfully' });
        } else {
            // Email failed to send
            res.status(500).json({ 'status': 'error', 'message': 'Failed to send OTP' });
        }
    }
    catch (error) {
        // Handle any errors that occurred during sending the email
        console.error('Error sending OTP email:', error.message);
        res.status(500).json({ 'status': 'error', 'message': 'Internal server error' });
    }
}
exports.verifyOTP=async(req,res)=>{

}

