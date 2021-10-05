const sanitise = require("./sanitise");
const testArrays = require("./testData/products");

it("Handles lists of strings.", () => {
  expect(sanitise(testArrays.arrayA)).toEqual([
    {
      name: "Product Name",
      manufacturer: "Stark",
      mounting: ["ceiling-surface", "ceiling-recessed"],
    },
    {
      name: "Product Name",
      manufacturer: "Lannister",
      bodyColour: ["white", "black"],
    },
  ]);
});

it("Handles lists of numbers.", () => {
  expect(sanitise(testArrays.arrayB)).toEqual([
    {
      name: "Product Name",
      manufacturer: "Targaryen",
      beamAngles: [8, 16, 32, 64],
    },
    {
      name: "Product Name",
      manufacturer: "Greyjoy",
      colourTemp: [2200, 2400, 2800, 3000],
    },
    {
      name: "Product Name",
      manufacturer: "Tully",
      cri: [60, 70, 80, 90],
    },
  ]);
});

it("Handles IP Ratings.", () => {
  expect(sanitise(testArrays.arrayC)).toEqual([
    {
      name: "Product Name",
      manufacturer: "Martell",
      ipParticle: [2, 2, 2, 2],
      ipMoisture: [0, 3, 4, 5],
    },
    {
      name: "Product Name",
      manufacturer: "Baratheon",
      ipParticle: [4, 4, 4, 4],
      ipMoisture: [0, 1, 2, 3],
    },
    {
      name: "Product Name",
      manufacturer: "Stark",
      ipParticle: [6, 6, 2, 2],
      ipMoisture: [3, 4, 5, 6],
    },
  ]);
});
