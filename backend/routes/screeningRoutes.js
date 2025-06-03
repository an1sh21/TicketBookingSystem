// routes/screeningRoutes.js
const express = require('express');
const router = express.Router();
const screeningController = require('../controllers/screeningController');

router.post('/create', async (req, res) => {
  const { tmdbId, roomId, startTime, price } = req.body;

  if (!tmdbId || !roomId || !startTime || !price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const screening = await createScreening(tmdbId, roomId, startTime, price);
    res.status(201).json(screening);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', screeningController.getAllScreenings); // <-- this is the GET /api/screenings


module.exports = router;