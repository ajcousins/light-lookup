const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");

const adminRouter = require("./routes/adminRouter");

const app = express();

// app.use(bodyParser.json());
// app.use(express.urlencoded());
// app.use(multer());

app.use(cors());

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
