// src/App.js
import { useState, useEffect } from 'react';
import MovieCarousel from './components/MovieCarousel';
import ComingSoon from './components/ComingSoon';
import AdminPanel from './components/AdminPanel';
import './App.css';

function App() {
  const [movies, setMovies] = useState({
    nowShowing: [
      {
        id: 1,
        title: "Avengers: Endgame",
        image: "https://m.media-amazon.com/images/I/81ai6zx6eXL._AC_SL1304_.jpg",
        rating: 8.4
      },
      {
        id: 2,
        title: "Spider-Man: No Way Home",
        image: "https://m.media-amazon.com/images/M/MV5BMmFiZGZjMmEtMTA0Ni00MzA2LTljMTYtZGI2MGJmZWYzZTQ2XkEyXkFqcGc@._V1_.jpg",
        rating: 8.2
      },
      {
        id: 3,
        title: "John Wick",
        image: "https://legacymovieposters.com/cdn/shop/products/johnwick_fuse.jpg?v=1668071841&width=1946",
        rating: 7.4
      },
      {
        id: 4,
        title: "Transformers One",
        image: "https://resizing.flixster.com/AFGpgeQ8QmSmf9FBvHnKafUY6xs=/fit-in/352x330/v2/https://resizing.flixster.com/Nf9rlbQUjzuMQ-vXdRGMScWkcs8=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzU4MDZhYjI1LTFiNTQtNDc0Ni04OTI2LWI0Nzc4OWJiNDYxYy5qcGc=",
        rating: 7.1
      },
      {
        id: 5,
        title: "Grand Turismo",
        image: "https://m.media-amazon.com/images/M/MV5BMjA0N2YyNmYtZDk4Ny00ODE2LThmZWQtNGJiMDk0YzhiNzE5XkEyXkFqcGc@._V1_.jpg",
        rating: 7.3
      },
      {
        id: 6,
        title: "A Minecraft Movie",
        image: "https://lh4.googleusercontent.com/proxy/TaDD2E7SoMMw4FhpzUUyNr3Ytw0_jiMaCP513hlqQnSnvpjyDSSqYd4MQRYcJogJOEVu15lGM90a1eermPLnnIyo8E9C80ADlz_-hlZA0oIOp2myZA",
        rating: 6.8
      }
    ],
    comingSoon: [
      {
        id: 7,
        title: "Avengers: Secret Wars",
        image: "https://m.media-amazon.com/images/I/81ai6zx6eXL._AC_SL1304_.jpg",
        releaseDate: "2025-05-01"
      },
      {
        id: 8,
        title: "Spider-Man: Beyond",
        image: "https://m.media-amazon.com/images/M/MV5BMmFiZGZjMmEtMTA0Ni00MzA2LTljMTYtZGI2MGJmZWYzZTQ2XkEyXkFqcGc@._V1_.jpg",
        releaseDate: "2025-07-15"
      },
      {
        id: 9,
        title: "John Wick 5",
        image: "https://legacymovieposters.com/cdn/shop/products/johnwick_fuse.jpg?v=1668071841&width=1946",
        releaseDate: "2025-03-22"
      },
      {
        id: 10,
        title: "Transformers Two",
        image: "https://lh3.googleusercontent.com/proxy/O9YW21TZUYpqQsEXxuX7eWIdYdlniuRFW99HFwGUAOQo_tsPiq2XDmb3J2ASMCGNEWNRjlVX9Ax-af5NNLjw4Y28T2HIDExr4hdB8n8qXVpMHfealxK9",
        releaseDate: "2025-06-10"
      }
    ]
  });

  const addMovie = (newMovie, category) => {
    setMovies(prev => ({
      ...prev,
      [category]: [...prev[category], newMovie]
    }));
  };

  const removeMovie = (id, category) => {
    setMovies(prev => ({
      ...prev,
      [category]: prev[category].filter(movie => movie.id !== id)
    }));
  };

  return (
    <div className="app">
      <h1>Welcome to MovieMania 🎬</h1>
      <h2>Now Showing:</h2>
      
      <MovieCarousel movies={movies.nowShowing} />
      
      <h2>Coming Soon</h2>
      <ComingSoon movies={movies.comingSoon} />
      
      <AdminPanel 
        movies={movies} 
        addMovie={addMovie} 
        removeMovie={removeMovie} 
      />
    </div>
  );
}

export default App;