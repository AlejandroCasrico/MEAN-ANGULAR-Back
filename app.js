
const express = require('express'); 
var bodyParser = require('body-parser');

var app  = express();
//load files routes
var projectRoutes = require('./Routes/project');

//middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Routes
app.use('/api',projectRoutes);


//Cors
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY,Origin,X-Request');
    res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,DELETE');
    res.header('Allow','GET,POST,OPTIONS,PUT,DELETE');
    next();
})


//export 
module.exports = app;