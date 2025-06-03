import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('/api/movies')
      .then(res => setMovies(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Movie List</h2>
      <ul className="space-y-2">
        {movies.map(movie => (
          <li key={movie._id} className="p-4 border rounded">
            <strong>{movie.title}</strong> ({movie.runtime} mins)
          </li>
        ))}
      </ul>
    </div>
  );
}
