const express = require('express')
const router = express.Router()
const multer = require('multer')()
const adminAuthToken = require('../middleware/authTokenForAdmin')
const authToken = require('../middleware/authToken')

const { createMovieDetails, updateMovieDetails } = require('../controllers/movieDetail.controller')

router.post('/create-movie-detail/create', [multer.none(), adminAuthToken], createMovieDetails)
router.put('/movie-detail/:id', updateMovieDetails)

module.exports = router