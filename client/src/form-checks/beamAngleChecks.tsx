export const beamFormat = (val: string) => {
  // Sanitises input
  let lastChar = val.slice(val.length - 1, val.length);
  const regex = new RegExp("[0-9,. ]");
  if (regex.test(lastChar)) {
    return val;
  } else {
    return val.slice(0, val.length - 1);
  }
};

export const beamValues = (input: string) => {
  let inputArr = input.split(" ").join("").split(",");
  if (inputArr.some((val) => Number(val) > 120))
    return "All beam angles must be between 1 and 120 degrees.";
  else return "";
};
