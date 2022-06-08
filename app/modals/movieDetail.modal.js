const mongoose = require('mongoose')

const MovieDetailSchema = new mongoose.Schema({
    cast: {
        type: [String],
        required: [true, 'must provide cast']
    },
    director: {
        // type: mongoose.SchemaTypes.Mixed,
        type: [String],
        required: [true, "must provide director's name"]
    },
    producer: {
        type: [String],
        requried: [true, "must provide producer's name"]
    },
    writer: {
        type: [String],
        required: [true, "must provide writer's name"]
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movies",
        required: [true, "must provide movie id"]
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('MovieDetail', MovieDetailSchema)