import connectDb from "./db.js";
import { ObjectId } from "mongodb";

const root = {
    Query: {
         getCourses: async () => {
            let db, courses = []
            try {
                db = await connectDb();
                courses = await db.collection("courses").find().toArray();
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
            return courses;
        },
        getCourse: async (root, {id}) => {
            let db, course = null;
            try {
                db = await connectDb();
                course = await db.collection("courses").findOne({ _id: new ObjectId(id) });
            } catch (error) {
                console.error("Error fetching course:", error);
            }
            return course;
        }
    },
};

export default root;
