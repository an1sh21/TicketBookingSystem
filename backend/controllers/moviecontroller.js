const axios = require('axios');
const Movie = require('../models/movie');
const Screening = require('../models/screening');

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find(); // You can limit or sort if needed
    res.status(200).json(movies);
  } catch (err) {
    console.error('Error fetching all movies:', err);
    res.status(500).json({ error: 'Failed to retrieve movies' });
  }
};


exports.fetchNowPlayingAndSave = async (req, res) => {
  try {
    const tmdbMovies = await getNowPlayingMovies();
    const savedMovies = [];

    for (const tmdbMovie of tmdbMovies) {
      let movie = await Movie.findOne({ tmdbId: tmdbMovie.id });

      if (!movie) {
        const details = await getMovieDetails(tmdbMovie.id);
        movie = new Movie({
          tmdbId: tmdbMovie.id,
          title: tmdbMovie.title,
          posterUrl: `https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}`,
          description: tmdbMovie.overview,
          runtime: details.runtime,
          releaseDate: tmdbMovie.release_date
        });
        await movie.save();
      }

      savedMovies.push(movie);
    }

    res.json(savedMovies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch and save movies' });
  }
};

exports.getScreeningsForMovie = async (req, res) => {
  try {
    const tmdbId = parseInt(req.params.tmdbId);
    if (isNaN(tmdbId)) return res.status(400).json({ error: 'Invalid TMDB ID' });

    const movie = await Movie.findOne({ tmdbId });
    if (!movie) return res.status(404).json({ error: 'Movie not found' });

    const screenings = await Screening.find({ movieId: movie._id })
      .populate('roomId')
      .populate('movieId');

    res.json(screenings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
