const mongoose = require('mongoose')
// const multer = require('multer')
const moment = require('moment')

const MovieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide movie name']
    },
    catagory: {
        type: String,
        required: [true, 'must provide catagory']
    },
    image: {
        type: String,
        required: [true, 'must provide image']
    },
    tag_line: {
        type: [String],
        required: [true, 'must provide tagline']
    },
    release_date: {
        type: String,
    },
    abstract: {
        type: String,
        required: [true, 'must provide movie details']
    },
    youtube_link: {
        type: String,
        required: [true, 'must provide youtube link']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Movies', MovieSchema)