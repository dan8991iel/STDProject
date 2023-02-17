const mongoose = require('mongoose')
const autoIncrementModelID = require('./counter')

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
    publications: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Book",
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

module.exports = mongoose.model('Author', authorSchema)