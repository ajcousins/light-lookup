export interface ProductType {
  product: {
    name: string;
    mounting: [string];
    bodyColour: [string];
    ipParticle: [number];
    ipMoisture: [number];
    maxLength: number;
    maxWidth: number;
    maxHeight: number;
    colourTemp: [number];
    cri: [number];
    beamAngles: [number];
    manufacturer: {
      name: string;
      country: string;
      website: string;
      imgFilename?: string;
    };
    imgFilename?: string;
    remoteUrl?: string;
  };
}

export interface Pages {
  current: number;
  last: number;
}
