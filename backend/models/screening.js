// models/Screening.js
const mongoose = require('mongoose');

const screeningSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room' },
  startTime: Date,
  price: Number
});
module.exports = mongoose.model('Screening', screeningSchema);
