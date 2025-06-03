const Movie = require('../models/movie');
const Screening = require('../models/screening');
const Room = require('../models/room');
const { generateSeatsForScreening } = require('./seatController');

// ✅ Define createScreening
const createScreening = async (tmdbId, roomId, startTime, price) => {
  try {
    const movie = await Movie.findOne({ tmdbId });
    if (!movie) throw new Error('Movie not found');

    const screening = new Screening({
      movieId: movie._id,
      roomId,
      startTime,
      price,
    });

    await screening.save();
    await screening.populate('movieId');

    const room = await Room.findById(roomId);
    const rows = 5;
    const seatsPerRow = Math.floor(room.capacity / rows);

    await generateSeatsForScreening(roomId, screening._id, rows, seatsPerRow);

    return screening;
  } catch (error) {
    console.error('Failed to create screening:', error.message);
    throw error;
  }
};

// ✅ Define getAllScreenings
const getAllScreenings = async (req, res) => {
  try {
    const screenings = await Screening.find()
      .populate('movieId')
      .populate('roomId');

    res.json(screenings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch screenings' });
  }
};

// ✅ Export both functions
module.exports = {
  createScreening,
  getAllScreenings,
};
