const bookingCab = require("../models/booking")
const unirest = require("unirest");
const user = require("../models/user")
const moment = require("moment")
const path = require('path');
let express = require("express")
let router = express.Router()


router.get("/cab_booking", (req, res) => {
  res.sendFile(path.join(__dirname + '/views/user.html'));
})

router.get("/cab_booking_location", (req, res) => {
  res.sendFile(path.join(__dirname + '/views/booking.html'));
})



router.post("/user_detail", (req, res) => {
  console.log("data")
  // res.send("data")
  // let register =  function(req, res) {
  let usernam = req.body.name
  let emails = req.body.email
  let pwd = req.body.password
  let rpwd = req.body.rpw
  let user_id = req.body.customerId

  console.log(usernam,emails)
  if (!pwd || !emails) {
    return res.status(422).send({ errors: [{ title: 'Data missing!', detail: 'Provide email and password!' }] });
  }
  if (pwd !== rpwd) {
    return res.status(422).send({ errors: [{ title: 'Invalid passsword!', detail: 'Password is not a same as confirmation!' }] });
  }
  const users = new user({
    username: usernam,
    email: emails,
    password: pwd,
    customer_id: user_id
  });
  users.save()
    .then(doc => {
      console.log(doc)
      res.send(doc)
    })
    .catch(err => {
      console.error(err)
      res.send(err)
    })
})

router.post("/user_cab_request/:userId", (req, res) => {
  let uid = req.body.userId
  user.find({ customer_id: uid }, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      if (Array.isArray(result)) {
        let start_location = req.body.startAt
        let end_loc = req.body.endAt
        let guest = req.body.guests
        console.log(start_location,end_loc,guest)
        let user_data = new bookingCab({
          customerId: uid,
          startAt: start_location,
          endAt: end_loc,
          guests: guest
        })

        user_data.save()
          .then(doc => {
            console.log(doc)
            res.send(doc)
          })
          .catch(err => {
            console.error(err)
            res.send(err)
          })
      
      } else {
        res.send({
          "error": "You entered wrong user id please correct your user id "
        })
      }
    }
  })
      
      
})

router.get("/user_bookings",(req,res)=>{
  let uid = req.body.customerId
  bookingCab.find({customerId:uid},function (err, bookings) {
    if (err) {
      res.send(err);
    } else {
      res.send(bookings)
    }
    })
})

router.get("/s",(req,res)=>{
  var apiCall = unirest("GET",
    "https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/"
  );
  apiCall.headers({
    "x-rapidapi-host": "ip-geolocation-ipwhois-io.p.rapidapi.com",
    "x-rapidapi-key": "9K_q_9Q2GHP_rcvLuyYj3BQe1094eTtRl0xsKfutrG4klpN4VEtHYn-x-fZ_2uvmBOMNVrHx0AqHwMk2aNHbiwRFfm_Xgl1o"
  });
  apiCall.end(function(result) {
    if (res.error) throw new Error(result.error);
    console.log(result.body);
    res.send(result.body);
  });
})


module.exports = router


// {
//   "username":"shivanic18",
//   "email":"sh@132gmail.com",
//   "password":"true23456",
//   "rpw":"true23456",
//   "customerId":123456

//   }  