const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let database;

async function connectDatabase() {
  const client = await MongoClient.connect('mongodb://localhost:27017');
  database = client.db('Website');

  if (!database) {
    console.log('Database not connected');
  }

  return database;
}

async function getDataFromDatabase() {
  if (!database) {
    await connectDatabase();
  }

  const collection = database.collection('Data');
  const data = await collection.find().toArray();

  return data;
}

async function getUserFromDatabase(email, password) {
  if (!database) {
    await connectDatabase();
  }

  const collection = database.collection('UserData');
  const user = await collection.findOne({ email, password });

  return user;
}

async function insertUserToDatabase(user) {
  if (!database) {
    await connectDatabase();
  }

  const collection = database.collection('UserData');
  await collection.insertOne(user);
}

async function insertData(data) {
  if (!database) {
    await connectDatabase();
  }

  const collection = database.collection('Data');
  await collection.insertOne(data);
}

async function updateUserInDatabase(updatedData) {
  if (!database) {
    await connectDatabase();
  }

  const collection = database.collection('Data');
  await collection.deleteMany({});
  await collection.insertMany(updatedData);
}

module.exports = {
  getDataFromDatabase,
  getUserFromDatabase,
  insertData,
  updateUserInDatabase,
  insertUserToDatabase
};
