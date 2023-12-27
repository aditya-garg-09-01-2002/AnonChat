// app.js
const express = require('express');
const app = express();
const appConfig=require('./config/appConfig')
const cors=require('cors');
const loginRoutes=require('./routes/login');
const registerRoutes=require('./routes/register');
const chatRoutes=require('./routes/chat');
const otpRoutes =require('./routes/otp');
const cookieParser=require('cookie-parser');
const socketIO=require('socket.io');
const {getJWT,parseCookies}=require('./utils/jwtUtils')
const {getSize,curTime}=require('./utils/chatUtils')



app.use(cors({
    origin: [appConfig.FRONTEND_LINK,appConfig.FRONTEND_LINK+'/'],
    credentials: true,
}));

app.use(cookieParser());

app.use(express.json())


app.use('/log',loginRoutes);
app.use('/register',registerRoutes);
app.use('/otp',otpRoutes);
app.use('/chat',chatRoutes);

const PORT = process.env.PORT || 9000;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const io = socketIO(server, {
    pingTimeout: 60000,
    cors: {
        origin: [appConfig.FRONTEND_LINK,appConfig.FRONTEND_LINK+'/'],
        credentials:true,
    },
});