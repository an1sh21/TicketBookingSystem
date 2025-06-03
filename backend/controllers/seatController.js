const Seat = require('../models/Seat');
const Room = require('../models/room');

/**
 * Generate seats for a room (used when setting up a room).
 */
const generateSeatsForRoom = async (roomId, rows, seatsPerRow) => {
  try {
    const seats = [];

    for (let row = 1; row <= rows; row++) {
      for (let number = 1; number <= seatsPerRow; number++) {
        seats.push({
          roomId,
          row,
          number,
        });
      }
    }

    const createdSeats = await Seat.insertMany(seats);
    return createdSeats;
  } catch (err) {
    throw new Error(`Failed to generate seats for room: ${err.message}`);
  }
};

/**
 * Generate seats for a specific screening based on room config.
 */
const generateSeatsForScreening = async (roomId, screeningId, rows, seatsPerRow) => {
  try {
    const seats = [];

    for (let row = 1; row <= rows; row++) {
      for (let number = 1; number <= seatsPerRow; number++) {
        seats.push({
          roomId,
          screeningId,
          row,
          number,
        });
      }
    }

    const createdSeats = await Seat.insertMany(seats);
    return createdSeats;
  } catch (err) {
    throw new Error(`Failed to generate seats for screening: ${err.message}`);
  }
};

module.exports = {
  generateSeatsForRoom,
  generateSeatsForScreening,
};
