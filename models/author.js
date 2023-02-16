const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema( {
    _id: {
        type: Number, // TODO auto increment
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

module.exports = mongoose.model('Author', authorSchema)