"use strict";
import { config } from "../config/config.js";
import { MongoClient } from "mongodb";

let connection;

export default async function connectDB() {
    if (connection) return connection;

    let client;

    try {
        const client = new MongoClient(config.MONGO_URI);
        await client.connect();
        connection = client.db(config.DB_NAME);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }

    return connection;
}
