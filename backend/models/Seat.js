const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  screeningId: { type: mongoose.Schema.Types.ObjectId, ref: 'Screening', required: true },
  row: Number,
  number: Number,
  isBooked: { type: Boolean, default: false },
});

// ✅ Prevent OverwriteModelError
module.exports = mongoose.models.Seat || mongoose.model('Seat', seatSchema);
