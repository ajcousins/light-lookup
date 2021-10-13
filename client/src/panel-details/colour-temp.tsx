import i1800 from "../imgs/colour-temp/i1800.jpg";
import i2000 from "../imgs/colour-temp/i2000.jpg";
import i2200 from "../imgs/colour-temp/i2200.jpg";
import i2400 from "../imgs/colour-temp/i2400.jpg";
import i2700 from "../imgs/colour-temp/i2700.jpg";
import i3000 from "../imgs/colour-temp/i3000.jpg";
import i3500 from "../imgs/colour-temp/i3500.jpg";
import i4000 from "../imgs/colour-temp/i4000.jpg";
import i5000 from "../imgs/colour-temp/i5000.jpg";
import i6500 from "../imgs/colour-temp/i6500.jpg";

export const temperatures = [
  { value: 1800, hex: "#f98e00", img: i1800 },
  { value: 2000, hex: "#fa9e00", img: i2000 },
  { value: 2200, hex: "#faad00", img: i2200 },
  { value: 2400, hex: "#fcbb32", img: i2400 },
  { value: 2700, hex: "#fdc658", img: i2700 },
  { value: 3000, hex: "#fee2ae", img: i3000 },
  { value: 3500, hex: "#fff3dc", img: i3500 },
  { value: 4000, hex: "#ffffff", img: i4000 },
  { value: 5000, hex: "#f3f7fd", img: i5000 },
  { value: 6500, hex: "#e2ebf9", img: i6500 },
];

export const valueLabelFormat = function (value: number) {
  return `${value} K`;
};

export const hexColour = function (value: number) {
  const index = temperatures.findIndex((temps) => value === temps.value);
  return temperatures[index].hex;
};

export const cttImg = function (value: number) {
  const index = temperatures.findIndex((temp) => temp.value === value);
  return temperatures[index].img;
};
