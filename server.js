const express = require('express');
const dotenv = require('dotenv');
const morgan  = require('morgan'); 
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const connectDB = require('./server/database/connection');


dotenv.config({path:'config.env'})
const port = process.env.port || 8080


//connect mongo
connectDB();


// log reqests
app.use(morgan("tiny"))


// parse req to boady parser
app.use(bodyParser.urlencoded({extended:true}))


// set view engine
app.set("view engine" , "ejs")
//app.set('views' , path.resolve(__dirname , "views/ejs") )

//load assests
app.use('/css' , express.static(path.resolve(__dirname , "assests/css")))
app.use('/js' , express.static(path.resolve(__dirname , 'assests/js')))
app.use('/img' , express.static(path.resolve(__dirname , "assests/img")))

//load router
app.use('/' , require('./server/routs/route'))






app.listen(port , ()=>
{
    console.log(`server is running on ${port}`);
})

