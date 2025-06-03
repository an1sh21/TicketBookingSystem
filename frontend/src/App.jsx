// src/App.js
import { useState, useEffect } from 'react';
import MovieCarousel from './components/MovieCarousel';
import ComingSoon from './components/ComingSoon';
import AdminPanel from './components/AdminPanel';
import './App.css';
import axios from 'axios';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('/api/movies/now-playing').then(res => setMovies(res.data));
  }, []);


  return (
    <div className="app">
      <h1>Welcome to MovieMania 🎬</h1>
      <h2>Now Showing:</h2>
      
      <MovieCarousel movies={movies.nowShowing} />
      
      <h2>Coming Soon</h2>
      <ComingSoon movies={movies.comingSoon} />
    </div>
  );
}

export default App;