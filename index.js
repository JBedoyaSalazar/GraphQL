"use strict";
import _dotenv from "dotenv/config";
import { makeExecutableSchema } from "graphql-tools";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { readFileSync } from "fs";
import path from "path";
import root from "./lib/resolvers.js";
import cors from "cors";
import { config } from "./config/config.js";

const app = express();
const PORT = config.PORT;
const isDevelopment = config.NODE_ENV !== "production";

app.use(express.json());
app.use(cors());

const typeDefs = readFileSync(path.resolve("lib", "schema.graphql"), "utf-8");

const schema = makeExecutableSchema({
    typeDefs,
    resolvers: root,
});

app.use(
    "/api",
    graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: isDevelopment,
    })
);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/api`);
});
