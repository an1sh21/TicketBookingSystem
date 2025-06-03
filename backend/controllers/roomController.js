const Room = require('../models/room');
const Seat = require('../models/Seat');

exports.createRoom = async (req, res) => {
  console.log('🎯 /api/room/create POST hit');

  const { name, capacity } = req.body;

  try {
    const room = new Room({ name, capacity });
    await room.save();
    res.status(201).json(room);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

exports.testRoomRoute = (req, res) => {
  console.log('✅ Room test route hit');
  res.send('Room route works!');
};

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSeatsByRoomId = async (req, res) => {
  try {
    const seats = await Seat.find({ roomId: req.params.roomId });
    res.json(seats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
