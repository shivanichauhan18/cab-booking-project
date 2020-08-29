const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
let url = require("./config/index")
let routes = require("./routes/index")
const app = express();
app.use(bodyParser.json());


mongoose.connect(url);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use("/",routes)



const PORT = process.env.PORT || 3001;
app.listen(PORT , function() {
  console.log('App is running!');
});