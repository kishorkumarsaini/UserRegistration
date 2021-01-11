const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
//const path = require('path');
//const dotenv = require('dotenv');

//dotenv.config({path:'./config.env'});

const userRouter  = require('./routes/userRout');
const  tutorialRouter = require('./routes/tutorialRouts');
 
const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cookieParser());

//connect to mongodb database
mongoose.connect('mongodb://localhost:27017/Users',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
.then(()=>{
    console.log('Database connect successfully');
})
.catch((err)=>{
    console.error(err);
});



app.use('/api/v1/users',userRouter);
app.use('/api/v1/tutorial',tutorialRouter);
//listen the port
app.listen(port,()=>{
    console.log(`app is live at ${port}`);
});
