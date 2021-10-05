const Product = require("./../models/product");
const Manufacturer = require("./../models/manufacturer");
const addIds = require("../utils/csvParseHelpers/addIds");
const parseCsv = require("../utils/csvParseHelpers/parseCsv");

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

exports.clearProducts = async (req, res, next) => {
  Product.deleteMany({})
    .then(() => {
      res.status(200).json({
        status: "OK",
      });
    })
    .catch((err) => {
      res.status(200).json({
        status: "Error",
        error: err,
      });
    });
};
