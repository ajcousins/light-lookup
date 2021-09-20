import ip0X from "../imgs/ip-ratings/ip0X.svg";
import ip1X from "../imgs/ip-ratings/ip1X.svg";
import ip2X from "../imgs/ip-ratings/ip2X.svg";
import ip3X from "../imgs/ip-ratings/ip3X.svg";
import ip4X from "../imgs/ip-ratings/ip4X.svg";
import ip5X from "../imgs/ip-ratings/ip5X.svg";
import ip6X from "../imgs/ip-ratings/ip6X.svg";
import ipX0 from "../imgs/ip-ratings/ipX0.svg";
import ipX1 from "../imgs/ip-ratings/ipX1.svg";
import ipX2 from "../imgs/ip-ratings/ipX2.svg";
import ipX3 from "../imgs/ip-ratings/ipX3.svg";
import ipX4 from "../imgs/ip-ratings/ipX4.svg";
import ipX5 from "../imgs/ip-ratings/ipX5.svg";
import ipX6 from "../imgs/ip-ratings/ipX6.svg";
import ipX7 from "../imgs/ip-ratings/ipX7.svg";
import ipX8 from "../imgs/ip-ratings/ipX8.svg";

export const bodyRating = [
  { value: 0, img: ip0X },
  { value: 1, img: ip1X },
  { value: 2, img: ip2X },
  { value: 3, img: ip3X },
  { value: 4, img: ip4X },
  { value: 5, img: ip5X },
  { value: 6, img: ip6X },
];

export const moistureRating = [
  { value: 0, img: ipX0 },
  { value: 1, img: ipX1 },
  { value: 2, img: ipX2 },
  { value: 3, img: ipX3 },
  { value: 4, img: ipX4 },
  { value: 5, img: ipX5 },
  { value: 6, img: ipX6 },
  { value: 7, img: ipX7 },
  { value: 8, img: ipX8 },
];

export const getImgUrl = (
  val: string,
  array: { value: number; img: string }[]
) => {
  const index = array.findIndex((rating) => rating.value === Number(val));
  return array[index].img;
};
