const mongoose = require('mongoose')
const Author = require('./author')
const autoIncrementModelID = require('./counter')

const authorNameSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    }
})

const bookSchema = new mongoose.Schema( {
    _id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: false
    },
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    authors: {
        type:[
            {
                name: authorNameSchema,
            }
        ],
        required: true
    },   
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