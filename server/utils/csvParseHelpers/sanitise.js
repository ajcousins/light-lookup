// Sanitise data for db upload
const sanitise = (arr) => {
  const sanitised = arr.map((product) => {
    let obj = { ...product };

    obj.mounting = stringlistToArray(obj.mounting);

    obj.bodyColour = stringlistToArray(obj.bodyColour);

    obj.beamAngles = numberlistToArray(obj.beamAngles);

    obj.colourTemp = numberlistToArray(obj.colourTemp);

    obj.cri = numberlistToArray(obj.cri);

    if (!obj.length) delete obj.length;
    else obj.length = Number(obj.length);
    if (!obj.width) delete obj.width;
    else obj.width = Number(obj.width);
    if (!obj.height) delete obj.height;
    else obj.height = Number(obj.height);

    obj.ipRatings = stringlistToArray(obj.ipRatings);
    obj.ipParticle = obj.ipRatings.map((val) => Number(val.charAt(0)));
    obj.ipMoisture = obj.ipRatings.map((val) => Number(val.charAt(1)));
    delete obj.ipRatings;

    const keys = Object.keys(obj);
    keys.forEach((key) => {
      if (obj[key].length === 0) delete obj[key];
    });

    return obj;
  });
  return sanitised;
};

const stringlistToArray = (stringList) => {
  if (!stringList) return [];
  return stringList.split(" ").join("").split(",");
};

const numberlistToArray = (numList) => {
  if (!numList) return [];
  return numList
    .split(" ")
    .join("")
    .split(",")
    .map((val) => Number(val));
};

module.exports = sanitise;
