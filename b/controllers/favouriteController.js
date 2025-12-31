const Favourite = require('../models/favouriteModel');

// Add movie to favorites
exports.addFavourite = async (req, res) => {
  try {
    const { userEmail, movie } = req.body;
    
    if (!userEmail) {
      return res.status(400).json({
        success: false,
        message: 'User email is required'
      });
    }
    
    if (!movie || !movie._id || !movie.title) {
      return res.status(400).json({
        success: false,
        message: 'Movie data is required'
      });
    }
    
    // Check if already favorited
    const existing = await Favourite.findOne({
      userEmail,
      'movie._id': movie._id
    });
    
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Movie already in favorites'
      });
    }
    
    const favourite = await Favourite.create({
      userEmail,
      movie
    });
    
    res.status(201).json({
      success: true,
      message: 'Movie added to favorites',
      data: favourite
    });
  } catch (error) {
    console.error('Add favourite error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to add to favorites'
    });
  }
};

// Get all favorites for a user
exports.getFavourites = async (req, res) => {
  try {
    const { userEmail } = req.query;
    
    if (!userEmail) {
      return res.status(400).json({
        success: false,
        message: 'User email is required'
      });
    }
    
    const favourites = await Favourite.find({ userEmail })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: favourites.length,
      data: favourites
    });
  } catch (error) {
    console.error('Get favourites error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch favorites'
    });
  }
};

// Remove movie from favorites
exports.removeFavourite = async (req, res) => {
  try {
    const { userEmail, movieId } = req.body;
    
    if (!userEmail || !movieId) {
      return res.status(400).json({
        success: false,
        message: 'User email and movie ID are required'
      });
    }
    
    const deleted = await Favourite.findOneAndDelete({
      userEmail,
      'movie._id': movieId
    });
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Favorite not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Movie removed from favorites',
      data: deleted
    });
  } catch (error) {
    console.error('Remove favourite error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to remove from favorites'
    });
  }
};

// Check if movie is favorited
exports.checkFavourite = async (req, res) => {
  try {
    const { userEmail, movieId } = req.query;
    
    if (!userEmail || !movieId) {
      return res.json({
        success: true,
        isFavourite: false
      });
    }
    
    const favourite = await Favourite.findOne({
      userEmail,
      'movie._id': movieId
    });
    
    res.json({
      success: true,
      isFavourite: !!favourite
    });
  } catch (error) {
    console.error('Check favourite error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to check favorite status'
    });
  }
};

