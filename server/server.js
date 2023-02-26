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
    res.header(
      // "Access-Control-Allow-Origin",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});

const booksRouter = require('./routes/v1/books')
app.use('/books', booksRouter)

const authorsRouter = require('./routes/v1/authors.js')
app.use('/authors', authorsRouter)

app.listen(3000, () => console.log('Server started'))