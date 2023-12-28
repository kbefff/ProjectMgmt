const express = require('express'); // yarn add express
require('dotenv').config()
const { graphqlHTTP } = require('express-graphql')
// const { createHandler } = require('graphql-http/lib/use/express');
const schema = require('./schema/schema');
const port = process.env.PORT || 8080

const app = express();
app.use(
    '/graphql',
    graphqlHTTP({
        schema: schema,
        graphiql: process.env.NODE_ENV === 'development',
    }),
);

console.log(`running in ${process.env.NODE_ENV || "default"} mode`)
app.listen(port, console.log(`Listening to http://localhost:${port}`));

