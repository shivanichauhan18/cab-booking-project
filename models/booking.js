const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    startAt: { type: Date, required: 'User location is required'},
    endAt: { type: Date, required: 'drop location is required'},
    days: Number,
    guests: Number
})

module.exports = mongoose.model('Booking', schema);
