'use strict';

import connectDb from "./db.js";
import { ObjectId } from "mongodb";

export default {
    Course: {
        students: async ({ students }) => {
            let db;
            let peopleData = [];
            let ids
            try {
                db = await connectDb();
                ids = students ? students.map(id => new ObjectId(id)) : [];
                peopleData = ids.length > 0 ? await db.collection("students").find({ _id: { $in: ids } }).toArray() : [];
                console.log("Fetched people for course:", peopleData);
            } catch (error) {
                console.error("Error fetching people for course:", error);
            }
            return peopleData;
        }
    }
}