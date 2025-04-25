// src/components/ComingSoon.jsx
import MovieCard from './MovieCard';

const ComingSoon = ({ movies }) => {
  return (
    <div className="flex-container">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} isNowShowing={false} />
      ))}
    </div>
  );
};

export default ComingSoon;