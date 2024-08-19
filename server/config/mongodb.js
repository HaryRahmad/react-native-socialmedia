const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.URL_MONGO;
console.log(uri);
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

  const database = client.db(`GC01-facebook`)

  module.exports = database;