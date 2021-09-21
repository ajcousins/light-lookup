export const bodyColours = [
  { value: "", output: "None", hex: "" },
  { value: "black", output: "Black", hex: "#232323" },
  { value: "grey", output: "Grey", hex: "#7a7a7a" },
  { value: "white", output: "White", hex: "#efefef" },
  { value: "brown", output: "Brown", hex: "#7c5b27" },
  { value: "green", output: "Green", hex: "#337c24" },
  { value: "bronze", output: "Bronze", hex: "#472d08" },
  { value: "brass", output: "Brass", hex: "#f2d55a" },
  { value: "brushed-steel", output: "Brushed Steel", hex: "#8f959b" },
  { value: "polished-steel", output: "Polished Steel", hex: "#ebeff2" },
  { value: "anthracite", output: "Anthracite", hex: "#40484b" },
  { value: "custom", output: "Custom RAL", hex: "#ed3aa9" },
];

export const getBodyColourHex = (colourString: string) => {
  const index = bodyColours.findIndex(
    (colour) => colour.value === colourString
  );
  return bodyColours[index].hex;
};
