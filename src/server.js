const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const env=require("dotenv");
const cors = require('cors');
const passport=require('passport')
const session=require('express-session') 

//environ
env.config()

//middlewares
app.use(cors({
    origin:"*"
}));
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });


//passport config
require('./config/passport')(passport)


//express session
app.use(session({
    secret: 'rosh is a good girl',
    resave: false,
    saveUninitialized: false,
    
  }))

//Passport
app.use(passport.initialize())
app.use(passport.session())

//routes

const authroutes=require('./routes/auth')
const profileroutes=require('./routes/profile')


app.use('/auth',authroutes)
app.use('/api',profileroutes)

//mongoose connection

mongoose.connect(`${process.env.MONGO_URI}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false 
})
    .then(() => console.log("Connected to Database"))
    .catch(err => console.error("An error has occured", err));
    
//server
const PORT= process.env.PORT || 2000
app.listen(
   PORT,
    console.log(`Server started on port ${PORT}`)
);
