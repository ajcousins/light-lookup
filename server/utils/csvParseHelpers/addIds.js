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

module.exports = addIds;
