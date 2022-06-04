const express = require('express');
const app = express(); 
require('dotenv').config();
const cors = require('cors');
const colour = require('colors');
const morgan = require("morgan");
const connectDB = require('./Config/database');
const {errorHandler} = require('./Middleware/errorHandler');
const userRouter = require('./Router/userRouter');


//database
connectDB();

//internal middleware
app.use(morgan("dev"));
app.use(express.json({limit: "30mb"}));
app.use(express.urlencoded({limit: "30mb",extended: false}));
app.use(cors());

//
app.use('/api', userRouter)

//
app.use(errorHandler);

//local host connection
const port = process.env.PORT || 4000;
app.listen(port, ()=>{
 console.log(`server is running at ${port}...`);
});