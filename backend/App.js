const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const connectDB = require('./config/dbConnect');
const connectCloudinary = require('./config/cloudinary');

const bookingRoutes = require('./routes/bookingRoute');
const showRoutes = require('./routes/showRoute');
const authRoutes = require('./routes/authRoute');
const video360Routes = require('./routes/video360Route');
const favouriteRoutes = require('./routes/favouriteRoute');

const app = express();

// DB + Cloudinary
connectDB();
connectCloudinary();

// CORS
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// Routes
app.use("/api/bookings", bookingRoutes);
app.use("/api", showRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/videos360", video360Routes);
app.use("/api/favourites", favouriteRoutes);

// Server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
