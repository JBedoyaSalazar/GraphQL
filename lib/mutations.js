"use strict";
import connectDb from "./db.js";
import { ObjectId } from "mongodb";
import { errorHandler } from "./error.handler.js";

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
            errorHandler(error);
        }
        return newCourse;
    },
    createPerson: async (root, { input }, { db }) => {
        let newPerson = null;
        try {
            db = await connectDb();
            const result = await db.collection("people").insertOne({
                ...input,
            });
            newPerson = {
                _id: result.insertedId,
                ...input,
            };
        } catch (error) {
            errorHandler(error);
        }
        return newPerson;
    },
    updateCourse: async (root, { id, input }, { db }) => {
        let updatedCourse = null;
        try {
            db = await connectDb();
            const _result = await db.collection("courses").updateOne({ _id: id }, { $set: input });
            updatedCourse = await db.collection("courses").findOne({ _id: new ObjectId(id) });
        } catch (error) {
            errorHandler(error);
        }
        return updatedCourse;
    },
    updatePerson: async (root, { id, input }, { db }) => {
        let updatedPerson = null;
        try {
            db = await connectDb();
            const _result = await db
                .collection("people")
                .updateOne({ _id: new ObjectId(id) }, { $set: input });
            updatedPerson = await db.collection("people").findOne({ _id: new ObjectId(id) });
        } catch (error) {
            errorHandler(error);
        }
        return updatedPerson;
    },
    addPersonToCourse: async (root, { courseId, personId }, { db }) => {
        let updatedCourse = null;
        let person, course;
        try {
            db = await connectDb();
            course = await db.collection("courses").findOne({ _id: new ObjectId(courseId) });
            person = await db.collection("people").findOne({ _id: new ObjectId(personId) });

            if(!course || !person) {
                throw new Error("Course or person not found");
            }

            const _result = await db.collection("courses").updateOne(
                { _id: new ObjectId(courseId) },
                { $push: { students: new ObjectId(personId) } }
            );
            
            updatedCourse = await db.collection("courses").findOne({ _id: new ObjectId(courseId) });
        } catch (error) {
            errorHandler(error);
        }
        return updatedCourse;
    }
};
