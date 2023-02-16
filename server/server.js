require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.set('strictQuery', true)
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'))

app.use(express.json())

const booksRouter = require('./routes/api/v1/books')
app.use('/books', booksRouter)

const authorsRouter = require('./routes/api/v1/authors.js')
app.use('/authors', authorsRouter)

app.listen(3000, () => console.log('Server started'))