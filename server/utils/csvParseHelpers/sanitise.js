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

module.exports = sanitise;
