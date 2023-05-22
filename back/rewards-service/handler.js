"use strict";
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const dbjs = require("./db.js");
const headers = {
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE",
};
module.exports.getRewards = async (event) => {
  const db = await dbjs.database();
  if (event?.body) {
    const body = JSON.parse(event.body);
    if (Object.keys(body)?.length > 0) {
      const rewards = await db
        .collection("rewards")
        .find()
        .sort(body)
        .toArray();
      console.log(rewards);
      return { statusCode: 200, headers, body: { rewards: rewards } };
    }
  }
  const rewards = await db.collection("rewards").find().toArray();
  return { statusCode: 200, headers, body: { rewards: rewards } };
};

module.exports.postRewards = async (event) => {
  const db = await dbjs.database();
  const newReward = await db
    .collection("rewards")
    .insertOne(JSON.parse(event.body));
  return { statusCode: 201, headers, body: { response: newReward } };
};

module.exports.deleteRewards = async (event) => {
  const db = await dbjs.database();
  const result = await db
    .collection("rewards")
    .deleteOne({ _id: new ObjectId(`${event.rawPath.substring(1)}`) });
  return { statusCode: 200, headers, body: { response: result } };
};

module.exports.login = async (event) => {
  const db = await dbjs.database();
  const user = await db.collection("users").findOne(JSON.parse(event.body));
  if (user) {
    var token = jwt.sign({ id: user.id }, "rewSecret");
    return { statusCode: 200, headers, body: { accessToken: token } };
  }
  return {
    statusCode: 404,
    headers,
    body: { response: "Invalid Credentials" },
  };
};
