require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

const app = express();

app.use(cors());

app.use(express.json());

const booksRouter = require('./routes/v1/books')
app.use('/v1/books', booksRouter)
app.use('/books', booksRouter)

/*const authorsRouter = require('./routes/v1/authors.js')
app.use('/v1/authors', authorsRouter)
app.use('/authors', authorsRouter)*/

const server = http.createServer(app);
server.listen(3000, () => console.log('Server started'))

module.exports = {
    start: async () => {
      await server.listen(3000);
    },
    close: async () => {
      await server.close();
    },
  };