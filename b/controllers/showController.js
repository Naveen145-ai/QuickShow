const Show = require('../models/showModel');

// Admin: create a show
exports.createShow = async (req, res) => {
  try {
    const { title, poster, price, rating = 0, times = [], active = true } = req.body;
    if (!title || !poster || !price) return res.status(400).json({ message: 'title, poster, price are required' });
    const show = await Show.create({ title, poster, price, rating, times, active });
    res.status(201).json(show);
  } catch (e) {
    res.status(500).json({ message: e.message || 'Failed to create show' });
  }
};

// Public: list active shows
exports.listShows = async (req, res) => {
  try {
    const shows = await Show.find({ active: true }).sort({ createdAt: -1 });
    res.json(shows);
  } catch (e) {
    res.status(500).json({ message: e.message || 'Failed to list shows' });
  }
};
