const mongoose = require('mongoose')
const Author = require('./author')
const autoIncrementModelID = require('./counter')

const bookSchema = new mongoose.Schema( {
    _id: {
        type: Number,
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
    authors: [{
        type: Number, ref: 'Author', required: false
    }]
    ,
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
        type: Number,
        min: 0,
        max: 2,
        required: false
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