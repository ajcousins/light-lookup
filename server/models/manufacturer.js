const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const manufacturerSchema = new Schema({
  name: String,
  country: String,
  website: String,
});

module.exports = mongoose.model("Manufacturer", manufacturerSchema);
