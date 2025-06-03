
# 🎬 Movie Booking API

A Node.js + Express backend for managing movie screenings, rooms, seats, and bookings, integrated with The Movie Database (TMDB) API.

## 📦 Features

- 🔗 Connects to **MongoDB** using Mongoose.
- 🎞️ Fetches and stores **now-playing movies** from the TMDB API.
- 🏟️ Manages **rooms**, **seats**, and **screenings**.
- 🪑 Dynamically generates seats for each screening (based on room layout).
- 📆 Creates screenings and associates available seats per time slot.
- 🧾 Future-ready for implementing customer bookings and payments.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/movie-booking-api.git
cd movie-booking-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root with the following:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
TMDB_API_KEY=your_tmdb_api_key
```

---

## 🔌 API Endpoints

### 🎥 Movies

- `GET /api/movies/now-playing`  
  Fetches now-playing movies from TMDB and stores them in MongoDB.

- `GET /api/movies/:tmdbId/screenings`  
  Lists all screenings for a specific movie.

---

### 🏟️ Rooms

- `POST /api/rooms/create`  
  Creates a new room (name and capacity).

- `GET /api/rooms`  
  Lists all available rooms.

- `GET /api/rooms/:roomId/seats`  
  Gets all seats for a given room.

---

### 🎬 Screenings

- `POST /api/screenings/create`  
  Creates a screening and automatically generates seats for it.

  ```json
  {
    "tmdbId": 12345,
    "roomId": "abc123",
    "startTime": "2025-06-01T20:00:00.000Z",
    "price": 12.99
  }
  ```

---

### 💺 Seats

- `POST /api/seats/generate`  
  Generates seats for a specific room and screening (called automatically during screening creation).

  ```json
  {
    "roomId": "abc123",
    "screeningId": "xyz789",
    "rows": 5,
    "seatsPerRow": 10
  }
  ```

- `GET /api/seats/:screeningId`  
  Retrieves all seats for a specific screening.

---

## 🗃️ Project Structure

```
.
├── controllers/
│   ├── screeningController.js
│   └── seatController.js
├── models/
│   ├── movie.js
│   ├── room.js
│   ├── screening.js
│   └── seat.js
├── routes/
│   ├── movieRoutes.js
│   ├── roomRoutes.js
│   ├── screeningRoutes.js
│   └── seatRoutes.js
├── server.js
└── .env
```

---

## 📡 External APIs

- [TMDB (The Movie Database)](https://www.themoviedb.org/documentation/api)

---

## ✅ To-Do

- [ ] Add user authentication
- [ ] Implement booking/payment API
- [ ] Admin panel for managing movies and schedules
- [ ] Unit and integration tests

---

## 🛠️ Tech Stack

- **Node.js**
- **Express**
- **MongoDB + Mongoose**
- **TMDB API**

---

## 📄 License

MIT License © 2025

---

## 💡 Author

Built by [Your Name](https://github.com/your-username)
