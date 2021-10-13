import cri60 from "../imgs/cri-icons/triangle-pattern_cri-060.jpg";
import cri70 from "../imgs/cri-icons/triangle-pattern_cri-070.jpg";
import cri80 from "../imgs/cri-icons/triangle-pattern_cri-080.jpg";
import cri90 from "../imgs/cri-icons/triangle-pattern_cri-090.jpg";
import cri95 from "../imgs/cri-icons/triangle-pattern_cri-095.jpg";
import cri100 from "../imgs/cri-icons/triangle-pattern_cri-100.jpg";

export const cris = [
  { value: 60, img: cri60 },
  { value: 70, img: cri70 },
  { value: 80, img: cri80 },
  { value: 90, img: cri90 },
  { value: 95, img: cri95 },
  { value: 100, img: cri100 },
];

export const criLabelFormat = function (value: number) {
  if (value === 100) return `${value} CRI`;
  else return `≥ ${value} CRI`;
};

export const criImg = function (value: number) {
  const index = cris.findIndex((cri) => cri.value === value);
  return cris[index].img;
};
