const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    startAt: { type: String, required: 'User location is required'},
    endAt: { type: String, required: 'drop location is required'},
    guests: Number,
    customerId:Number

})

module.exports = mongoose.model('Booking', schema);
