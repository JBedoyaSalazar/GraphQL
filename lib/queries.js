"use strict";

import connectDb from "./db.js";
import { ObjectId } from "mongodb";

export default {
    getCourses: async () => {
        let db,
            courses = [];
        try {
            db = await connectDb();
            courses = await db.collection("courses").find().toArray();
        } catch (error) {
            console.error("Error fetching courses:", error);
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
            console.error("Error fetching course:", error);
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
            console.error("Error fetching students:", error);
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
            console.error("Error fetching student:", error);
        }
        return student;
    },
};
