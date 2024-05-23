const express = require('express');
require('dotenv').config()
const cors = require('cors')
const bodyParser = require("body-parser")
const path = require('path')
const app = express()
const requestData = require('./functions/requestData')

//Middlewares
app.use(cors())
app.use(bodyParser.json())

//Initializations
require('dotenv').config({path: path.resolve(__dirname, './.env')});

app.get('/', (req, res) => {
    res.send('Service Online!')
})

app.listen(3030)

//Functions
let day = 86400000
let twelveHours = 43200000
let sixHours = 21600000
let threeHours = 10800000

setInterval(()=>{
    requestData()
}, twelveHours)

requestData()