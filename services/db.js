const MongoClient = require("mongodb").MongoClient;

class MongoConnection {
  constructor() {
    const uri = process.env.MONGO_CONNECTION;
    this.client = new MongoClient(uri, { useUnifiedTopology: true });
  }
  async init() {
    await this.client.connect();
    console.log("Successfully connected to the database");

    const dbName = "campaignManager";
    this.db = this.client.db(dbName);
  }
}

module.exports = new MongoConnection();
