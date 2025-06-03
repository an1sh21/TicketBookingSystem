import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Screenings() {
  const [screenings, setScreenings] = useState([]);
  const [movies, setMovies] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [startTime, setStartTime] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    axios.get('/api/screenings').then(res => setScreenings(res.data));
    axios.get('/api/movies').then(res => setMovies(res.data));
    axios.get('/api/rooms').then(res => setRooms(res.data));
  }, []);

  const createScreening = () => {
   axios.post('/api/screenings/create', {
   tmdbId: selectedMovie,
   roomId: selectedRoom,
   startTime,
   price: parseFloat(price)
})
      .then(() => {
        setSelectedMovie('');
        setSelectedRoom('');
        setStartTime('');
        setPrice('');
        
        return axios.get('/api/screenings');
      })
      .then(res => setScreenings(res.data))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Screenings</h2>
      <div className="mb-4 space-y-2">
        <select value={selectedMovie} onChange={(e) => setSelectedMovie(e.target.value)} className="border p-2 rounded w-full">
          <option value="">Select Movie</option>
          {movies.map(movie => <option key={movie._id} value={movie._id}>{movie.title}</option>)}
        </select>
        <select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)} className="border p-2 rounded w-full">
          <option value="">Select Room</option>
          {rooms.map(room => <option key={room._id} value={room._id}>{room.name}</option>)}
        </select>
        <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="border p-2 rounded w-full" />
        <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            className="border p-2 rounded w-full"
        />
        <button onClick={createScreening} className="bg-blue-600 text-white px-4 py-2 rounded">Create Screening</button>
      </div>

      <ul className="space-y-2">
         {screenings.length === 0 ? (
             <li>No screenings available.</li>
            ) : (
        screenings.map(screening => (
        <li key={screening._id} className="p-4 border rounded">
            Movie: {screening.movieId?.title || 'Unknown Movie'} | 
            Room: {screening.roomId?.name || 'Unknown Room'} | 
            Start: {new Date(screening.startTime).toLocaleString()}
            Price: ${screening.price?.toFixed(2) || 'N/A'}
      </li>
        ))
        )}
        </ul>
    </div>
  );
}
