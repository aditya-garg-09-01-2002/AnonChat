// app.js
const express = require('express');
const app = express();
const cors=require('cors');
const loginRoutes=require('./routes/login');
const registerRoutes=require('./routes/register');
const otpRoutes =require('./routes/otp');

app.use(cors())
app.use(express.json())

app.use('/login',loginRoutes);
app.use('/register',registerRoutes);
app.use('/send-otp',otpRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});