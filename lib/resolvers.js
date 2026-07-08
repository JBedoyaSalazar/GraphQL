import queries from "./queries.js";
import mutations from "./mutations.js";
import types from "./types.js";

const root = {
    Query: {
        ...queries
    },
    Mutation: {
        ...mutations
    },
    ...types
};

export default root;
    