"use strict";
import { config } from "../config/config.js";
import { MongoClient } from "mongodb";

let connectionPromise;

export default async function connectDB() {

    if (!connectionPromise) {

        connectionPromise = (async () => {
            const client = new MongoClient(config.MONGO_URI);
            await client.connect();
            return client.db(config.DB_NAME);
        })();

    }

    return connectionPromise;
}
