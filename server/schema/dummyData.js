// dummydata
const products = [
  {
    id: "1",
    manufacturerId: "1",
    name: "Easy ceiling general lighting",
    type: "Downlight",
    url: "https://www.iguzzini.com/easy-ceiling-general-lighting/",
    physical: {
      mounting: "Surface",
      ip: ["40"],
      bodyColor: ["White", "Black"],
    },
    dimensions: {
      totalLength: 114,
      totalWidth: 114,
      totalHeight: 155,
      diameter: 114,
      recessDepth: 0,
    },
    optical: {
      diffuse: false,
      asymmetrical: false,
      beamAngle: [66],
      beamAngleAsym: [], // supplied as strings ["32x10", "32x5"]
      adjustable: [false],
    },
    lamp: {
      manufacturerId: "2",
      type: ["LED"],
      colourTemp: [3000, 4000],
      cri: [80, 90],
    },
    electrical: {
      wattage: [12.9, 13.2],
    },
  },
  {
    id: "2",
    manufacturerId: "2",
    name: "Logic Mini W S",
    type: "Steplight",
    url: "https://www.deltalight.com/en/products/light/logic/logic-mini?form=searchForm&reference_nr=&location=2&fixation=3&assembly=2&new=&is_essential=&type=light&region=int&is_deco=0",

    physical: {
      mounting: "Recessed",
      ip: ["54"],
      bodyColor: ["Grey", "White"],
    },
    dimensions: {
      totalLength: 62,
      totalWidth: 40,
      totalHeight: 62,
      diameter: null,
      recessDepth: 36,
    },
    optical: {
      diffuse: false,
      asymmetrical: true,
      beamAngle: [],
      beamAngleAsym: [],
      adjustable: [false],
    },
    lamp: {
      manufacturerId: "2",
      type: ["LED"],
      colourTemp: [3000],
      cri: [80],
    },
    electrical: {
      wattage: [0.6],
    },
  },
  {
    id: "3",
    manufacturerId: "3",
    name: "Lumenbeam Small",
    type: "Spotlight",
    url: "https://www.lumenpulse.com/en/products/2286/lumenbeam-small",

    physical: {
      mounting: "Surface",
      ip: ["66"],
      bodyColor: ["Black", "Grey", "White", "Bronze", "Green", "Custom RAL"],
    },
    dimensions: {
      totalLength: 138,
      totalWidth: 118,
      totalHeight: 213,
      diameter: 135,
      recessDepth: 0,
    },
    optical: {
      diffuse: false,
      asymmetrical: true,
      beamAngle: [4, 6, 10, 20, 30, 40, 60],
      beamAngleAsym: [],
      adjustable: [true],
    },
    lamp: {
      manufacturerId: "3",
      type: ["LED"],
      colourTemp: [2200, 2700, 3000, 3500, 4000, 5700],
      cri: [80],
    },
    electrical: {
      wattage: [12.5],
    },
  },
  {
    id: "4",
    manufacturerId: "1",
    name: "Easy ceiling general lighting",
    type: "Downlight",
    url: "https://www.iguzzini.com/easy-ceiling-general-lighting/",
    physical: {
      mounting: "Surface",
      ip: ["40"],
      bodyColor: ["White", "Black"],
    },
    dimensions: {
      totalLength: 114,
      totalWidth: 114,
      totalHeight: 155,
      diameter: 114,
      recessDepth: 0,
    },
    optical: {
      diffuse: false,
      asymmetrical: false,
      beamAngle: [66],
      beamAngleAsym: [], // supplied as strings ["32x10", "32x5"]
      adjustable: [false],
    },
    lamp: {
      manufacturerId: "2",
      type: ["LED"],
      colourTemp: [4000],
      cri: [80, 90],
    },
    electrical: {
      wattage: [12.9, 13.2],
    },
  },
];

const manufacturers = [
  {
    id: "1",
    name: "iGuzzini",
    country: "Italy",
    website: "https://www.iguzzini.com/",
  },
  {
    id: "2",
    name: "Delta Light",
    country: "Belgium",
    website: "https://www.deltalight.com/",
  },
  {
    id: "3",
    name: "Lumenpulse",
    country: "Canada",
    website: "https://www.lumenpulse.com/",
  },
];

module.exports = { products, manufacturers };
