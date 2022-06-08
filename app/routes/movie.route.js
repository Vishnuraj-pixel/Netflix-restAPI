const express = require('express');
const router = express.Router();
const adminAuthToken = require('../middleware/authTokenForAdmin')

const multer = require('../middleware/uploadImage')

const { createMovie, findMovie, findAllMovies, updateMovie } = require('../controllers/movie.controller');
router.post('/create-movie/create', [multer, adminAuthToken], createMovie)
router.post('/movie/:id', findMovie)
router.get('/movie-list', [adminAuthToken], findAllMovies)
router.put('/movie/:id', updateMovie)

module.exports = router