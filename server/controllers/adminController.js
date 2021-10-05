const csv = require("csv-parser");
const fs = require("fs");
const Product = require("./../models/product");
const Manufacturer = require("./../models/manufacturer");

exports.populate = async (req, res, next) => {
  const manufacturers = await Manufacturer.find();

  const newProducts = await parseCsv(req.file.path);

  const includeIds = addIds(manufacturers, newProducts);

  Product.insertMany(includeIds)
    .then((docs) => {
      res.status(200).json({
        status: "OK",
        docs: docs,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "Error",
        err: err,
      });
    });
};

//--- Helper Functions ---//
const parseCsv = (file) => {
  return new Promise((resolve, reject) => {
    // Parse CSV
    const results = [];
    fs.createReadStream(file)
      .pipe(csv({}))
      .on("data", (product) => results.push(product))
      .on("end", () => {
        // console.log("results:", results);
        fs.unlinkSync(file);
        resolve(sanitise(results));
      });
  });
};

// Sanitise data for db upload
const sanitise = (arr) => {
  const sanitised = arr.map((product) => {
    let obj = { ...product };
    obj.mounting = stringlistToArray(obj.mounting);
    obj.bodyColour = stringlistToArray(obj.bodyColour);
    obj.beamAngles = stringlistToArray(obj.beamAngles).map((val) =>
      Number(val)
    );
    obj.colourTemp = stringlistToArray(obj.colourTemp).map((val) =>
      Number(val)
    );
    obj.cri = stringlistToArray(obj.cri).map((val) => Number(val));

    obj.length = Number(obj.length);
    obj.width = Number(obj.width);
    obj.height = Number(obj.height);

    obj.ipRatings = stringlistToArray(obj.ipRatings);
    obj.ipParticle = obj.ipRatings.map((val) => Number(val.charAt(0)));
    obj.ipMoisture = obj.ipRatings.map((val) => Number(val.charAt(1)));
    delete obj.ipRatings;

    return obj;
  });
  return sanitised;
};

const stringlistToArray = (string) => {
  if (!string) return [];
  return string.split(" ").join("").split(",");
};

const addIds = (manuArr, productsArr) => {
  const errorList = [];
  // console.log("manuArr:", manuArr, "productsArr:", productsArr);
  const arr = productsArr.map((product, i) => {
    const index = manuArr.findIndex(
      (manu) => manu.name === product.manufacturer
    );
    if (index === -1) {
      errorList.push(
        `Row ${i + 2}: Manufacturer "${product.manufacturer}" not found for "${
          product.name
        }"`
      );
      return product;
    }
    product.manufacturerId = manuArr[index]._id;
    delete product.manufacturer;
    return product;
  });

  if (errorList.length > 0) console.log("Error List:", errorList);
  return arr;
};
