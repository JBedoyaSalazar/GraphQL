"use strict";
import connectDb from "./db.js";
import { ObjectId } from "mongodb";

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
    createStudent: async (root, { input }, { db }) => {
        let newStudent = null;
        try {
            db = await connectDb();
            const result = await db.collection("students").insertOne({
                ...input,
            });
            newStudent = {
                _id: result.insertedId,
                ...input,
            };
        } catch (error) {
            console.error("Error creating student:", error);
        }
        return newStudent;
    },
    updateCourse: async (root, { id, input }, { db }) => {
        let updatedCourse = null;
        try {
            db = await connectDb();
            const _result = await db.collection("courses").updateOne({ _id: id }, { $set: input });
            updatedCourse = await db.collection("courses").findOne({ _id: new ObjectId(id) });
        } catch (error) {
            console.error("Error updating course:", error);
        }
        return updatedCourse;
    },
    updateStudent: async (root, { id, input }, { db }) => {
        let updatedStudent = null;
        try {
            db = await connectDb();
            const _result = await db
                .collection("students")
                .updateOne({ _id: new ObjectId(id) }, { $set: input });
            updatedStudent = await db.collection("students").findOne({ _id: new ObjectId(id) });
        } catch (error) {
            console.error("Error updating student:", error);
        }
        return updatedStudent;
    },
    addStudentToCourse: async (root, { courseId, studentId }, { db }) => {
        let updatedCourse = null;
        let person, course;
        try {
            db = await connectDb();
            course = await db.collection("courses").findOne({ _id: new ObjectId(courseId) });
            person = await db.collection("students").findOne({ _id: new ObjectId(studentId) });

            if(!course || !person) {
                throw new Error("Course or student not found");
            }

            const _result = await db.collection("courses").updateOne(
                { _id: new ObjectId(courseId) },
                { $push: { students: new ObjectId(studentId) } }
            );
            
            updatedCourse = await db.collection("courses").findOne({ _id: new ObjectId(courseId) });
        } catch (error) {
            console.error("Error adding student to course:", error);
        }
        return updatedCourse;
    }
};
