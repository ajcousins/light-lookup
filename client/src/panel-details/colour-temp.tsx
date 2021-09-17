export const temperatures = [
  { value: 0, hex: "#a0a0a0" },
  { value: 1800, hex: "#f98e00" },
  { value: 2000, hex: "#fa9e00" },
  { value: 2200, hex: "#faad00" },
  { value: 2400, hex: "#fcbb32" },
  { value: 2700, hex: "#fdc658" },
  { value: 3000, hex: "#fee2ae" },
  { value: 3500, hex: "#fff3dc" },
  { value: 4000, hex: "#ffffff" },
  { value: 5000, hex: "#f3f7fd" },
  { value: 6500, hex: "#e2ebf9" },
];

export const valueLabelFormat = function (value: number) {
  return `${value} K`;
};

export const hexColour = function (value: number) {
  const index = temperatures.findIndex((temps) => value === temps.value);
  return temperatures[index].hex;
};
