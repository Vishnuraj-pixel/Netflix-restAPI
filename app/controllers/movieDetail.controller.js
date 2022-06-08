const MovieDetail = require('../modals/movieDetail.modal')
const asyncWrapper = require('../middleware/async')

const createMovieDetails = asyncWrapper(async (req, res) => {
    try {
        if (!req.body) {
            res.status(401).json({ msg: `no data in body` })
        }
        const movieDetail = await MovieDetail.create(req.body)
        res.status(201).json(movieDetail)
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
})

const updateMovieDetails = asyncWrapper(async (req, res) => {
    try {
        if (!req.body) {
            res.status(401).json({ msg: 'no data in body' })
        }
        const id = req.params.id
        const cast = req.body.cast
        const director = req.body.director
        const producer = req.body.producer
        const editor = req.body.editor
        const writer = req.body.writer
        const update = {}
        if (cast) update.cast = cast
        if (director) update.director = director
        if (producer) update.producer = producer
        if (editor) update.editor = editor
        if (writer) update.writer = writer
        const movieDetail = await MovieDetail.findOneAndUpdate(
            { _id: id },
            { $set: update },
            { runValidators: true }
        )
        res.status(201).json(movieDetail)
    } catch (err) {
        res.status(500).json({ msg: err.message || 'error in updating movie details' })
    }
})

module.exports = {
    createMovieDetails,
    updateMovieDetails
}