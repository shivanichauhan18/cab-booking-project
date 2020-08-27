const bookingCab = require("../models/booking")
const user = require("../models/user")
const moment = require("moment")
const path = require('path');
let express = require("express")
let router = express.Router()


router.get("/cab_booking",(req,res)=>{
    res.sendFile(path.join(__dirname + '/views/user.html'));
})


router.post("/user_detail",(req,res)=>{
    res.send("haaaa")
})

module.exports = router