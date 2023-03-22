const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoServer = new MongoMemoryServer();

module.exports = async function setupDB() {
  await mongoServer.start(); // Start the server explicitly
  const uri = await mongoServer.getUri();
  process.env.DATABASE_URL = uri;
};