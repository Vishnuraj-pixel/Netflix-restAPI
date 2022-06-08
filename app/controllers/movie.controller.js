const Movie = require('../modals/movie.modal')
const asyncWrapper = require('../middleware/async');
const mongoose = require('mongoose');

const createMovie = asyncWrapper(async (req, res) => {
    try {
        const image = req.file.path.slice(8)
        const { name, tag_line, catagory, release_date, abstract, youtube_link } = req.body
        const findMovie = await Movie.findOne({ name: name });
        if (findMovie) {
            res.status(401).json({ msg: `${name} is already exist` })
        } else {
            if (name && tag_line && catagory && release_date && abstract && youtube_link) {
                const create = {
                    name: name,
                    image: image,
                    catagory: catagory,
                    tag_line: tag_line,
                    release_date: release_date,
                    abstract: abstract,
                    youtube_link: youtube_link
                }
                Movie.create(create).then((data) => {
                    res.status(201).json({ id: data._id, msg: "Successfully created" })
                })
            }

        }
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ msg: err.message })
    }
})

const findAllMovies = asyncWrapper(async (req, res) => {
    try {
        // const findMovies = await Movie.find({})
        await Movie.aggregate([
            {
                $lookup: {
                    from: "moviedetails",
                    localField: "_id",
                    foreignField: "movieId",
                    as: "crewMembers",
                }
            }
        ]).then(result => {
            res.status(201).json(result)
        })
    } catch (err) {
        res.status(500).json({ msg: err.message || 'error in find all movies' })
    }
})

const findMovie = asyncWrapper(async (req, res) => {
    try {
        const { id } = req.params
        await Movie.aggregate(
            [
                {
                    $match: { _id: new mongoose.Types.ObjectId(id) }
                },
                {
                    $lookup: {
                        from: "moviedetails",
                        localField: "_id",
                        foreignField: "movieId",
                        as: "crewMembers",
                    }
                },
            ]).then((result) => {
                res.status(201).json(result)
            })
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
})

const updateMovie = asyncWrapper(async (req, res) => {
    try {
        const { id } = req.params.id
        const { name, image, tag_line, release_date, abstract, youtube_link } = req.body

        const update = {}
        if (name) update.name = name
        if (image) update.image = image
        if (tag_line) update.tag_line = tag_line
        if (release_date) update.abstract = abstract
        if (youtube_link) update.youtube_link = youtube_link
        const movie = await Movie.findOneAndUpdate(
            { _id: id },
            { $set: update },
            {
                new: [true, 'new movie created'],
                runValidators: true
            }

        )
        res.status(201).json(movie)
    } catch (err) {
        res.status(500).json({ msg: err.message || `error in updating updating ${req.body.name} movie` })
    }
})

module.exports = {
    createMovie,
    findAllMovies,
    findMovie,
    updateMovie
}