const mongoose = require('mongoose');

const favouriteSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  movie: {
    _id: { type: String, required: true },
    title: { type: String, required: true },
    poster: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    times: { type: [String], default: [] }
  }
}, { timestamps: true });

// Prevent duplicate favorites (same user + same movie)
favouriteSchema.index({ userEmail: 1, 'movie._id': 1 }, { unique: true });

module.exports = mongoose.model('Favourite', favouriteSchema);

