const express = require('express');
const router = express.Router();
const {
  createRoom,
  testRoomRoute,
  getAllRooms,
  getSeatsByRoomId
} = require('../controllers/roomController');

router.post('/create', createRoom);
router.get('/test', testRoomRoute);
router.get('/', getAllRooms);
router.get('/:roomId/seats', getSeatsByRoomId);

module.exports = router;
