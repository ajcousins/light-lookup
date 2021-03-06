const csv = require("csv-parser");
const fs = require("fs");
const sanitise = require("./sanitise");

const parseCsv = (file) => {
  return new Promise((resolve, reject) => {
    // Parse CSV
    const results = [];
    fs.createReadStream(file)
      .pipe(csv({}))
      .on("data", (product) => results.push(product))
      .on("end", () => {
        fs.unlinkSync(file);
        // console.log("sanitise(results):", sanitise(results));
        resolve(sanitise(results));
      });
  });
};

module.exports = parseCsv;
