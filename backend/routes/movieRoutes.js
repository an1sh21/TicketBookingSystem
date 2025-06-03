// routes/movieRoutes.js
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/moviecontroller');

// GET /api/movies - for Admin Panel
router.get('/', movieController.getAllMovies); // <--- ADD THIS LINE


// GET /api/movies/fetch-now-playing - trigger TMDB fetch
router.get('/fetch-now-playing', movieController.fetchNowPlayingAndSave);

// GET /api/movies/:tmdbId/screenings - get screenings for a movie
router.get('/:tmdbId/screenings', movieController.getScreeningsForMovie);

module.exports = router;