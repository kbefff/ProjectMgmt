const express = require('express');
require('dotenv').config()
const colors = require('colors')
const path = require('path');
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema');
const connectDB = require('./config/db')
const port = process.env.PORT || 8080

const cors = require('cors')

//connect to database
connectDB()

const app = express();

app.use(cors())

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: process.env.NODE_ENV === 'development',
  }),
);

//Server production assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join("client/build")))
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../client/build/index.html")))
}

app.listen(port, console.log(`Running in ${process.env.NODE_ENV || "default"} mode. Listening on http://localhost:${port}`.yellow.bold))
