const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  manufacturerId: { type: String, required: true },
  type: [String],
  mounting: [String],
  ipParticle: [Number],
  ipMoisture: [Number],
  bodyColour: [String],
  beamAngles: [Number],
  colourTemp: [Number],
  cri: [Number],
  length: Number,
  width: Number,
  height: Number,
  diameter: Number,
  recessDepth: Number,
});

module.exports = mongoose.model("Product", productSchema);
