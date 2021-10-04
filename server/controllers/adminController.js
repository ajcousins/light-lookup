const csv = require("csv-parser");
const fs = require("fs");
const Product = require("./../models/product");
const Manufacturer = require("./../models/manufacturer");

exports.populate = async (req, res, next) => {
  const manufacturers = await Manufacturer.find();
  console.log("Body:", req.file);

  parseCsv(req.file.path);

  res.status(200).json({
    status: "Success!",
    manufacturers,
  });
};

//--- Helper Functions ---//
const parseCsv = (file) => {
  // Parse CSV
  const results = [];
  fs.createReadStream(file)
    .pipe(csv({}))
    .on("data", (product) => results.push(product))
    .on("end", () => {
      //   console.log(results);
      sanitise(results);
      fs.unlinkSync(file);
    });
};

// Sanitise data for db upload
const sanitise = (arr) => {
  const sanitised = arr.map((product) => {
    let obj = { ...product };
    obj.mounting = stringlistToArray(obj.mounting);
    obj.bodyColour = stringlistToArray(obj.bodyColour);
    obj.beamAngles = stringlistToArray(obj.beamAngles);
    obj.colourTemp = stringlistToArray(obj.colourTemp);
    obj.cri = stringlistToArray(obj.cri);

    obj.ipRatings = stringlistToArray(obj.ipRatings);
    obj.ipParticle = obj.ipRatings.map((val) => val.charAt(0));
    obj.ipMoisture = obj.ipRatings.map((val) => val.charAt(1));
    delete obj.ipRatings;

    return obj;
  });
  console.log(sanitised);
};

const stringlistToArray = (string) => {
  if (!string) return [];
  return string.split(" ").join("").split(",");
};
