import queries from "./queries.js";
import mutations from "./mutations.js";

const root = {
    Query: {
        ...queries
    },
    Mutation: {
        ...mutations
    }
};

export default root;
    