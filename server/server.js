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
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

const booksRouter = require('./routes/v1/books')
app.use('/v1/books', booksRouter)
app.use('/books', booksRouter)

const authorsRouter = require('./routes/v1/authors.js')
app.use('/v1/authors', authorsRouter)
app.use('/authors', authorsRouter)

app.listen(3000, () => console.log('Server started'))