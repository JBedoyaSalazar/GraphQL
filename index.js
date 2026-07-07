"use strict";

const { graphql, buildSchema } = require("graphql");

const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

const root = {
  hello: () => "Hello GRAPHQL!",
};

graphql({
  schema,
  source: '{ hello }',
  rootValue: root
}).then((result) => {
  console.log(result);
});