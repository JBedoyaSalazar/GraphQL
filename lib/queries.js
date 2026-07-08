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
    getStudents: async () => {
        let db,
            students = [];
        try {
            db = await connectDb();
            students = await db.collection("students").find().toArray();
        } catch (error) {
            errorHandler(error);
        }
        return students;
    },
    getStudent: async (root, { id }) => {
        let db,
            student = null;
        try {
            db = await connectDb();
            student = await db.collection("students").findOne({ _id: new ObjectId(id) });
        } catch (error) {
            errorHandler(error);
        }
        return student;
    },
};
