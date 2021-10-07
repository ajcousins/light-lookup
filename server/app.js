const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const adminRouter = require("./routes/adminRouter");

const app = express();

const whitelist = ["https://light-lookup.pages.dev", "http://localhost:3000"];
const corOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corOptions));

mongoose.connect(process.env.DB_CONNECTION_STRING);
mongoose.connection.once("open", () => {
  console.log("Connected to database.");
});

app.use("/database", adminRouter);
// app.use("/upload-csv", router);

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Now listening for requests on port ${port}.`);
});
