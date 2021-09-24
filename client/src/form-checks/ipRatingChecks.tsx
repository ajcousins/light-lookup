export const ipFormat = (val: string) => {
  let lastChar = val.slice(val.length - 1, val.length);
  const regex = new RegExp("[0-8, ]");
  if (regex.test(lastChar)) {
    return val;
  } else {
    return val.slice(0, val.length - 1);
  }
};

export const ipValues = (input: string) => {
  let inputArr = input.split(" ").join("").split(",");
  if (inputArr.some((val) => Number(val) > 68))
    return "All IP Ratings must be between 00 and 68.";
  inputArr.pop();
  if (inputArr.some((val) => val.length === 1 || val.length > 2))
    return "IP Ratings must have 2 digits.";
  else return "";
};
