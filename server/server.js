const express = require('express')
// const bodyParser = require("body-parser");
const dbconfig = require('./config/config')
const authUser = require('./routes/user/auth.user')
const adminUsers = require('./routes/products/users')
const productroute = require('./routes/products/product')
const app = express()
require('dotenv').config({path:`.env.${process.env.NODE_ENV}`})
const port = 3005
app.use(express.json())

app.use('/auth',authUser)
app.use('/product',productroute)
app.use('/user',adminUsers)


app.listen(port,()=>{
    console.log('nodejs app is running');
})