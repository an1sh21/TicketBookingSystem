import React, { useState } from 'react';
import Movies from './pages/Movies';
import Rooms from './pages/Rooms';
import Screenings from './pages/Screenings';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('movies');

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mb-4 flex space-x-4">
        <button onClick={() => setActiveTab('movies')} className={`px-4 py-2 rounded ${activeTab === 'movies' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>Movies</button>
        <button onClick={() => setActiveTab('rooms')} className={`px-4 py-2 rounded ${activeTab === 'rooms' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>Rooms</button>
        <button onClick={() => setActiveTab('screenings')} className={`px-4 py-2 rounded ${activeTab === 'screenings' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>Screenings</button>
      </div>

      <div className="bg-white p-6 rounded shadow">
        {activeTab === 'movies' && <Movies />}
        {activeTab === 'rooms' && <Rooms />}
        {activeTab === 'screenings' && <Screenings />}
      </div>
    </div>
  );
}
