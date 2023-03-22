const mongoose = require('mongoose')
const Author = require('./author')
const autoIncrementModelID = require('./counter')

const authorNameSchema = new mongoose.Schema({
    firstName: String,
    surname: String
})

const bookSchema = new mongoose.Schema( {
    _id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    subheading: {
        type: String,
        required: false
    },
    isbn: {
        type: String,
        required: true
    },
    authors: [{
        name: authorNameSchema,
        required: false
    }],
    releaseYear: {
        type: Number,
        max: new Date().getFullYear() + 1,
        required: false
    },
    edition: {
        type: String,
        required: false
    },
    publisher: {
        type: String,
        required: true
    }
})

bookSchema.pre('save', function (next) {
  if (!this.isNew) {
    next()
    return
  }

  autoIncrementModelID('books', this, next)
})

module.exports = mongoose.model('Book', bookSchema)