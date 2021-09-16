export const temperatures = [
  { value: 1800 },
  { value: 2000 },
  { value: 2200 },
  { value: 2400 },
  { value: 2700 },
  { value: 3000 },
  { value: 3500 },
  { value: 4000 },
  { value: 5000 },
  { value: 6500 },
];

export const valuetext = (value: number) => {
  return `${value}°C`;
};

// export const valueLabelFormat = (value: number) => {
//   const index = temperatures.findIndex((mark) => mark.value === value);
//   return temperatures[index].label;
// };
