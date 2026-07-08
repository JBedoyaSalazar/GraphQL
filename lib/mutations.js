"use strict";
import connectDb from "./db.js";

export default {
    createCourse: async (root, { input }, { db }) => {
        const defaults = {
            teacher: "sin definir",
            topic: "sin definir",
        };
        let newCourse = null;
        try {
            db = await connectDb();
            const result = await db.collection("courses").insertOne({
                ...defaults,
                ...input,
            });
            newCourse = {
                _id: result.insertedId,
                ...defaults,
                ...input,
            };
        } catch (error) {
            console.error("Error creating course:", error);
        }
        return newCourse;
    },
};
