const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://sabul:sabul@rewards.oxbf6ym.mongodb.net/?retryWrites=true&w=majority";
let dbInstance = null;
module.exports.database = async function () {
  if (dbInstance) {
    return Promise.resolve(dbInstance);
  }
  const db = await MongoClient.connect(uri);
  dbInstance = db.db("rewardsdb");
  return dbInstance;
};
