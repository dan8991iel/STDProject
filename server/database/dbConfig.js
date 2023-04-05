const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongoServer = new MongoMemoryServer();
mongoose.set('strictQuery', true);

async function connectTestDB() {
  await mongoServer.start();
  const uri = await mongoServer.getUri();
  process.env.DATABASE_URL = uri;
}

async function connectDatabase(useTestDB = false) {
  if (useTestDB) {
    await connectTestDB();
  }

  mongoose.connect(process.env.DATABASE_URL);
  const db = mongoose.connection;
  db.on('error', console.error);
  db.once('open', () => console.log('Connected to database'));

}

module.exports = connectDatabase;