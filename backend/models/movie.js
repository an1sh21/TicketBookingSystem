const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
  tmdbId: { type: Number, unique: true },
  title: String,
  posterUrl: String,
  description: String,
  runtime: Number,
  releaseDate: Date
});
module.exports = mongoose.model('Movie', movieSchema);