import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [roomCapacity, setRoomCapacity] = useState('');


  const fetchRooms = () => {
    axios.get('/api/rooms')
      .then(res => setRooms(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleCreateRoom = () => {
  axios.post('/api/rooms/create', {
    name: roomName,
    capacity: parseInt(roomCapacity, 10)
    })
    .then(() => {
      setRoomName('');
      setRoomCapacity('');
      fetchRooms();
    })
    .catch(err => console.error(err));
    };


  return (
    <div className="flex space-x-2 mb-4">
    <input
    type="text"
    value={roomName}
    onChange={(e) => setRoomName(e.target.value)}
    placeholder="Room Name"
    className="border p-2 rounded"
  />
  <input
    type="number"
    value={roomCapacity}
    onChange={(e) => setRoomCapacity(e.target.value)}
    placeholder="Capacity"
    className="border p-2 rounded"
  />
  <button onClick={handleCreateRoom} className="bg-blue-600 text-white px-4 py-2 rounded">Create Room</button>
    </div>

  );
}
