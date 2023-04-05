require('dotenv').config();

const express = require('express');
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose');
const connectDatabase = require('./database/dbConfig');
const defaultPort = 3000;

const app = express();

app.use(cors());
app.use(express.json());

const booksRouter = require('./routes/v1/books');
app.use('/v1/books', booksRouter);
app.use('/books', booksRouter);

const server = http.createServer(app);

const start = async (config) => {
  await connectDatabase(config?.useTestDB);
  const PORT = config?.port || defaultPort;
  await server.listen(PORT);
  console.log('Server started');
};

const close = async () => {
  await server.close();
};

if (require.main === module) {
  start();
}

module.exports = {
  start,
  close,
  app,
  mongoose,
};