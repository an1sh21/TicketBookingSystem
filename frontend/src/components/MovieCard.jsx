// src/components/MovieCard.jsx
import React from 'react';

const MovieCard = ({ movie, isNowShowing }) => {
  return (
    <div className="card-border">
      <div className="card">
        <h3 className="title">{movie.title}</h3>
        <img src={movie.image} alt={movie.title} />
        <button className="btn">Book Now</button>
        {isNowShowing && movie.rating && (
          <div className="rating">{movie.rating}</div>
        )}
      </div>
    </div>
  );
};

export default MovieCard;