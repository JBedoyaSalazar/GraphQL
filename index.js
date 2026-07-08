"use strict";
import dotenv from "dotenv/config";
import { makeExecutableSchema } from "graphql-tools";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { readFileSync } from "fs";
import path from "path";
import root from "./lib/resolvers.js";
import { config } from "./config/config.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

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
        graphiql: true,
    })
);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}/api`);
});
