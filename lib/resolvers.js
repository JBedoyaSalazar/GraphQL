const courses = [
    {
        _id: "1",
        title: "Course 1",
        teacher: "Teacher 1",
        description: "Description for Course 1",
        topic: "Topic 1",
    },
    {
        _id: "2",
        title: "Course 2",
        teacher: "Teacher 2",
        description: "Description for Course 2",
        topic: "Topic 2",
    },
    {
        _id: "3",
        title: "Course 3",
        teacher: "Teacher 3",
        description: "Description for Course 3",
        topic: "Topic 3",
    },
];

const root = {
    Query: {
        getCourses: () => {
            return courses;
        },
        getCourse: (root, {id}) => {
            return courses.find(course => course._id === id);
        }
    },
};

export default root;
