"use strict";

const { graphql, buildSchema } = require("graphql");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());


const schema = buildSchema(`
    type Query {
        hello: String
        saludo: String
    }
`);

const root = {
  hello: () => "Hello GRAPHQL!",
  saludo: () => "Hey There! This is a greeting from GraphQL!"
};

app.use("/api", graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/api`);
});