"use strict";

import connectDb from "./db.js";
import { ObjectId } from "mongodb";
import { errorHandler } from "./error.handler.js";

export default {
    Course: {
        people: async ({ people }) => {
            let db;
            let peopleData = [];
            let ids;
            try {
                db = await connectDb();
                ids = people ? people.map((id) => new ObjectId(id)) : [];
                peopleData =
                    ids.length > 0
                        ? await db
                              .collection("people")
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
        __resolveType: (person, _context, _info) => {
            console.log(person);
            
            if (person.phone){
                return "Monitor";
            }else{
                return "Student";
            }
        },
    },
    GlobalSearch: {
        __resolveType: (item, _context, _info) => {
            if (item.title) {
                return "Course";
            } else if (item.phone) {
                return "Monitor";
            } else {
                return "Student";
            }
        }
    }
};
