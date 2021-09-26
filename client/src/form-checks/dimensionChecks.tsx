export const dimValue = (value: string) => {
  if (Number(value) > 500) {
    return "Dimension must not be greater than 500mm.";
  } else if (Number(value) < 1) {
    return "Dimension must not be less than 1mm.";
  } else return "";
};
