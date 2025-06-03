// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// ✅ Global request logger middleware (must go before routes)
app.use((req, res, next) => {
  console.log(`🌐 ${req.method} ${req.originalUrl}`);
  next();
});

// ✅ Connect to MongoDB (only once!)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// ✅ Routes
const movieRoutes = require('./routes/movieRoutes');
const screeningRoutes = require('./routes/screeningRoutes');
const roomRoutes = require('./routes/roomRoutes');
const seatRoutes = require('./routes/seatRoutes');

app.use('/api/movies', movieRoutes);
app.use('/api/screenings', screeningRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/seats', seatRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
