import ceilingMounted from "../imgs/mounting-icons/ceiling-mounted.svg";
import ceilingRecessed from "../imgs/mounting-icons/ceiling-recessed.svg";
import suspended from "../imgs/mounting-icons/suspended.svg";
import wallMounted from "../imgs/mounting-icons/wall-mounted.svg";
import wallRecessed from "../imgs/mounting-icons/wall-recessed.svg";
import trackMounted from "../imgs/mounting-icons/track-mounted.svg";
import floorMounted from "../imgs/mounting-icons/floor-mounted.svg";
import floorRecessed from "../imgs/mounting-icons/floor-recessed.svg";
import freestanding from "../imgs/mounting-icons/freestanding.svg";
import nodeSystems from "../imgs/mounting-icons/node-systems.svg";
import linearSystems from "../imgs/mounting-icons/linear-systems.svg";
import areaSystems from "../imgs/mounting-icons/area-systems.svg";

export const mountingTypes = [
  { img: ceilingMounted, kebab: "ceiling-mounted" },
  { img: ceilingRecessed, kebab: "ceiling-recessed" },
  { img: suspended, kebab: "suspended" },
  { img: wallMounted, kebab: "wall-mounted" },
  { img: wallRecessed, kebab: "wall-recessed" },
  { img: trackMounted, kebab: "track-mounted" },
  { img: floorMounted, kebab: "floor-mounted" },
  { img: floorRecessed, kebab: "floor-recessed" },
  { img: freestanding, kebab: "freestanding" },
  { img: nodeSystems, kebab: "node-systems" },
  { img: linearSystems, kebab: "linear-systems" },
  { img: areaSystems, kebab: "area-systems" },
];

export const getFormatted = (kebab: string) => {
  return kebab
    .toLowerCase()
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
