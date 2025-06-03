// routes/seatRoutes.js
const express = require('express');
const router = express.Router();
const { generateSeatsForRoom } = require('../controllers/seatController');
const Seat = require('../models/seat');

router.post('/generate', async (req, res) => {
  const { roomId, rows, seatsPerRow } = req.body;

  try {
    const createdSeats = await generateSeatsForRoom(roomId, rows, seatsPerRow);
    res.status(201).json(createdSeats);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:screeningId', async (req, res) => {
  try {
    const seats = await Seat.find({ screeningId: req.params.screeningId });
    res.json(seats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;