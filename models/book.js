const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema( {
    _id: {
        type: Number, // TODO auto increment
        required: true,
    },
    isbn: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    authors: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Author",
        required: true
    },
    edition: {
        type: Number,
        required: false
    },
    releaseYear: {
        type: Number,
        max: new Date().getFullYear() + 1,
        required: false
    },
    status: {
        type: String,
        min: 0,
        max: 2,
        required: false
    }
})

module.exports = mongoose.model('Book', bookSchema)