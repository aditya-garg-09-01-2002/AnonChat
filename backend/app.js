// app.js
const express = require('express');
const app = express();
const appConfig=require('./config/appConfig')
const jwtConfig=require('./config/jwt')
const sessionConfig=require('./config/session')
const cors=require('cors');
const loginRoutes=require('./routes/login');
const registerRoutes=require('./routes/register');
const otpRoutes =require('./routes/otp');
const expressSession=require('express-session');
const cookieParser=require('cookie-parser');



app.use(cors({
    origin: [appConfig.FRONTEND_LINK,appConfig.FRONTEND_LINK+'/'],
    credentials: true,
}));

app.use(cookieParser());
app.use(
    expressSession({
        secret: sessionConfig.SESSION_KEY,
        resave: false,
        saveUninitialized: false,
        name: sessionConfig.SESSION_COOKIE_NAME,
        maxAge: 1000*60*60*2, // 2 hour sessions only
        cookie: { 
            secure: sessionConfig.ENVIRONMENT==="production"?true:false,
            sameSite:'none', //production build must have this set
        },
    })
);
    
app.use(express.json())


app.use('/log',loginRoutes);
app.use('/register',registerRoutes);
app.use('/otp',otpRoutes);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
