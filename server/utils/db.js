require("dotenv").config();
const { MongoClient } = require('mongodb');

const MONGO_RADAR_COLLECTION = process.env["MONGO_RADAR_COLLECTION"];
const MONGO_UPLOAD_SESSIONS = process.env["MONGO_UPLOAD_SESSIONS"];

module.exports.getWristData = async (DB, query) => {
    console.log("Qureying mongo wrist data :", JSON.stringify(query));
    return DB.collection(MONGO_RADAR_COLLECTION).find(query).toArray();
}

module.exports.deleteWristData = async (DB, query) => {
    console.log("Deleting mongo wrist data :", JSON.stringify(query));
    return DB.collection(MONGO_RADAR_COLLECTION).deleteMany(query);
}

module.exports.insertWristData = async (DB, documents) => {
    console.log("Inserting mongo wrist data :", documents.length);
    return DB.collection(MONGO_RADAR_COLLECTION).insertMany(documents);
}

module.exports.getSessions = async (DB, query) => {
    console.log("Qureying mongo session data :", JSON.stringify(query));
    return DB.collection(MONGO_UPLOAD_SESSIONS).find(query).toArray();
}

module.exports.insertSessionData = async (DB, document) => {
    console.log("Inserting mongo session data");
    return DB.collection(MONGO_UPLOAD_SESSIONS).insertOne(document);
}

module.exports.deleteSessionData = async (DB, query) => {
    console.log("Deleting mongo session data :", JSON.stringify(query));
    return DB.collection(MONGO_UPLOAD_SESSIONS).deleteMany(query);
}