"use strict";

import connectDb from "./db.js";
import { ObjectId } from "mongodb";
import { errorHandler } from "./error.handler.js";

export default {
    Course: {
        students: async ({ students }) => {
            let db;
            let peopleData = [];
            let ids;
            try {
                db = await connectDb();
                ids = students ? students.map((id) => new ObjectId(id)) : [];
                peopleData =
                    ids.length > 0
                        ? await db
                              .collection("students")
                              .find({ _id: { $in: ids } })
                              .toArray()
                        : [];
                console.log("Fetched people for course:", peopleData);
            } catch (error) {
                errorHandler(error);
            }
            return peopleData;
        },
    },
    Person: {
        __resolveType: (person, context, info) => {
            console.log(person);
            
            if (person.phone){
                return "Monitor";
            }else{
                return "Student";
            }
        },
    },
};
