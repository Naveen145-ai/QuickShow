const express = require('express');
const router = express.Router();
const { createShow, listShows } = require('../controllers/showController');

// Admin endpoints
router.post('/admin/shows', createShow);
router.get('/admin/shows', listShows);

// Public endpoint
router.get('/shows', listShows);

module.exports = router;
