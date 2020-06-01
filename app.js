const createError = require('http-errors');
const express = require('express');
const fs = require('fs');
const path = require('path');
const request = require('request');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
const mongoose = require('mongoose');
const db = require('./config').mongoUrl
mongoose.connect(db)
.then(()=>console.log('connection is successfully'))
.catch(err=>{console.log(err)});

const userRoutes = require('./routes/user')
app.use('/user',userRoutes)
          app.use((req, res, next) => {
            next(createError(404));
          });
const port = process.env.port||5000;
app.listen(port,()=>{
    console.log(`app is running at port${port}`);
})