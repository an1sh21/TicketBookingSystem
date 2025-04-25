// src/components/AdminPanel.jsx
import { useState } from 'react';

const AdminPanel = ({ movies, addMovie, removeMovie }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('nowShowing');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !image) {
      alert('Please enter both title and image URL');
      return;
    }

    const newMovie = {
      id: Date.now(), // Simple unique ID
      title,
      image
    };

    if (category === 'nowShowing') {
      newMovie.rating = (Math.random() * 3 + 7).toFixed(1);
    } else {
      const daysToAdd = Math.floor(Math.random() * 180) + 30;
      const releaseDate = new Date();
      releaseDate.setDate(releaseDate.getDate() + daysToAdd);
      newMovie.releaseDate = releaseDate.toISOString().split('T')[0];
    }

    addMovie(newMovie, category);
    setTitle('');
    setImage('');
  };

  return (
    <div className="admin-panel">
      <h3>Movie Management</h3>
      <form className="admin-controls" onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Movie Title" 
        />
        <input 
          type="text" 
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL" 
        />
        <select 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="nowShowing">Now Showing</option>
          <option value="comingSoon">Coming Soon</option>
        </select>
        <button type="submit">Add Movie</button>
      </form>
      <div className="movie-list">
        {movies.nowShowing.map((movie) => (
          <div key={movie.id} className="movie-item">
            <span>{movie.title} (Now Showing)</span>
            <button onClick={() => removeMovie(movie.id, 'nowShowing')}>Delete</button>
          </div>
        ))}
        {movies.comingSoon.map((movie) => (
          <div key={movie.id} className="movie-item">
            <span>{movie.title} (Coming Soon)</span>
            <button onClick={() => removeMovie(movie.id, 'comingSoon')}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;