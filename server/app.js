const { application } = require("express");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());

mongoose.connect(process.env.DB_CONNECTION_STRING);
mongoose.connection.once("open", () => {
  console.log("Connected to database.");
});

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log("Now listening for requests on port 4000.");
});
