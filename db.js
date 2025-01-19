const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/";

const client = new MongoClient(uri);

async function getDB(dbName = "playground") {
  try {
    await client.connect();
    const db = client.db(dbName);
    return db;
  } catch (err) {
    console.error(err);
  }
}

async function closeDB() {
  await client.close();
  process.exit(0);
}

process.on("SIGINT", closeDB);
process.on("SIGTERM", closeDB);

module.exports = { getDB, closeDB };
