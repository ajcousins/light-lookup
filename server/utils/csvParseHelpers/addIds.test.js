const addIds = require("./addIds");
const testArrays = require("./testData/products");
const testManufacturers = require("./testData/manufacturers");

it("Replaces manufacturer with manufacturerId", () => {
  expect(addIds(testManufacturers, testArrays.arrayA)).toEqual([
    {
      name: "Product Name",
      manufacturerId: "3f45z33dc2",
      mounting: "ceiling-surface, ceiling-recessed",
    },
    {
      name: "Product Name",
      manufacturerId: "4eq527uutx",
      bodyColour: "white, black",
    },
  ]);
  expect(addIds(testManufacturers, testArrays.arrayB)).toEqual([
    {
      name: "Product Name",
      manufacturerId: "eyd1jj85cd",
      beamAngles: "8, 16, 32, 64",
    },
    {
      name: "Product Name",
      manufacturerId: "5ph36whx5w",
      colourTemp: "2200, 2400, 2800, 3000",
    },
    {
      name: "Product Name",
      manufacturerId: "7ij7v16tqq",
      cri: "60, 70, 80, 90",
    },
  ]);
});

it("Flags unregistered manufacturer", () => {
  const consoleSpy = jest.spyOn(console, "log");
  const array = [
    {
      name: "Product Name",
      manufacturer: "Tyrell",
    },
  ];
  expect(addIds(testManufacturers, array)).toEqual([
    {
      name: "Product Name",
      manufacturer: "Tyrell",
    },
  ]);
  expect(consoleSpy).toHaveBeenCalledWith(`Error List:`, [
    'Row 2: Manufacturer "Tyrell" not found for "Product Name"',
  ]);
});
