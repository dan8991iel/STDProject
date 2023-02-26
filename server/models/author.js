const mongoose = require('mongoose')
const autoIncrementModelID = require('./counter')
const Book = require('./book')

const authorSchema = new mongoose.Schema( {
    _id: {
        type: Number,
        required: true,
    },
    name: {
        firstName: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        }
    },
    publications: [{
        type: Number, ref: 'Book', required: false
    }],
    link: {
        type: String, 
        required: false
    }
        
    
})

authorSchema.pre('save', function (next) {
  if (!this.isNew) {
    next()
    return
  }

  autoIncrementModelID('authors', this, next)
})

authorSchema.post('save', function (doc) {
    doc.link = `/authors/${doc._id}`;
    // Save the updated author document
     doc.save();
  })

module.exports = mongoose.model('Author', authorSchema)