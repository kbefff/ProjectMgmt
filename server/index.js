const express = require('express');
require('dotenv').config()
const colors = require('colors')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema');
const connectDB = require('./config/db')
const port = process.env.PORT || 8080

//connect to database
connectDB()

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === 'development',
  }),
);

app.listen(port, console.log(`Running in ${process.env.NODE_ENV || "default"} mode
Listening on http://localhost:${port}`));

