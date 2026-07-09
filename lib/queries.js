"use strict";

import connectDb from "./db.js";
import { ObjectId } from "mongodb"
import { errorHandler } from "./error.handler.js";

export default {
    getCourses: async () => {
        let db,
            courses = [];
        try {
            db = await connectDb();
            courses = await db.collection("courses").find().toArray();
        } catch (error) {
            errorHandler(error);
        }
        return courses;
    },
    getCourse: async (root, { id }) => {
        let db,
            course = null;
        try {
            db = await connectDb();
            course = await db.collection("courses").findOne({ _id: new ObjectId(id) });
        } catch (error) {
            errorHandler(error);
        }
        return course;
    },
    getPeople: async () => {
        let db,
            people = [];
        try {
            db = await connectDb();
            people = await db.collection("people").find().toArray();
        } catch (error) {
            errorHandler(error);
        }
        return people;
    },
    getPerson: async (root, { id }) => {
        let db,
            people = null;
        try {
            db = await connectDb();
            people = await db.collection("people").findOne({ _id: new ObjectId(id) });
        } catch (error) {
            errorHandler(error);
        }
        return people;
    },
};
