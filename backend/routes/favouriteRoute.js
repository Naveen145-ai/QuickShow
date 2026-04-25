const express = require('express');
const {
  addFavourite,
  getFavourites,
  removeFavourite,
  checkFavourite
} = require('../controllers/favouriteController');

const router = express.Router();

// Add to favorites
router.post('/add', addFavourite);

// Get all favorites for a user
router.get('/all', getFavourites);

// Remove from favorites
router.post('/remove', removeFavourite);

// Check if movie is favorited
router.get('/check', checkFavourite);

module.exports = router;

