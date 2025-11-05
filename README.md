🧠 SlotSwapper - Backend
A peer-to-peer time-slot swapping application backend built using Node.js, Express, and MongoDB (Mongoose).

****  🚀 Features  ****

>>🔐 User Authentication using JWT

>>📅 Users can create, update, delete events

>>🔁 Mark events as Swappable

>>⚙️ Backend handles swap logic between users

>>🧠 MongoDB Data Models for Users, Events, and Swaps

>>🧾 Protected API routes with JWT Middleware

***** 🛠️ Tech Stack *****

>> Node.js (Runtime)

>> Express.js (Framework)

>> MongoDB + Mongoose (Database)

>> JWT + bcrypt (Authentication)

>> dotenv (Environment config)

>> CORS + REST APIs

***** 📁 Folder Structure *****

SlotSwapper/
├── src/
│   ├── config/db.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── eventRoutes.js
│   │   └── swapRoutes.js
│   ├── middleware/auth.js
│   └── models/
│       ├── User.js
│       ├── Event.js
│       └── SwapRequest.js
├── server.js
├── package.json
└── .env

***** ⚙️ Environment Variables (.env) *****

PORT=5050
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

***** ▶️ Run Locally *****

# install dependencies
npm install

# start server
npm run dev
Server will start on: http://localhost:5050

***** 📡 API Endpoints *****

| Method | Endpoint                 | Description                    |
| ------ | ------------------------ | ------------------------------ |
| POST   | `/api/auth/signup`       | Register a new user            |
| POST   | `/api/auth/login`        | Login and get JWT token        |
| GET    | `/api/events`            | Get all events for logged user |
| POST   | `/api/events`            | Create a new event             |
| PUT    | `/api/events/:id`        | Update an event                |
| DELETE | `/api/events/:id`        | Delete an event                |
| GET    | `/api/swappable-slots`   | Get all swappable slots        |
| POST   | `/api/swap-request`      | Send a swap request            |
| POST   | `/api/swap-response/:id` | Accept or reject swap          |
