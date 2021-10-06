import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface addProductState {
  name: string;
  manufacturerId: string;
  link: string;
  mounting: string[] | null;
  bodyColour: string[] | null;
  ipParticle: number[] | null;
  ipMoisture: number[] | null;
  colourTemp: number[] | null;
  cri: number[] | null;
  beamAngles: number[] | null;
  length: number;
  width: number;
  height: number;
  imgFilename: string;
  remoteUrl: string;
}

const initialState: addProductState = {
  name: "",
  manufacturerId: "",
  link: "",
  mounting: [],
  bodyColour: [],
  ipParticle: [],
  ipMoisture: [],
  colourTemp: [],
  cri: [],
  beamAngles: [],
  length: 0,
  width: 0,
  height: 0,
  imgFilename: "",
  remoteUrl: "",
};

export const addProductSlice = createSlice({
  name: "addProduct",
  initialState,
  reducers: {
    resetForm: (state) => {
      state.name = "";
      state.manufacturerId = "";
      state.link = "";
      state.mounting = [];
      state.bodyColour = [];
      state.ipParticle = [];
      state.ipMoisture = [];
      state.colourTemp = [];
      state.cri = [];
      state.beamAngles = [];
      state.length = 0;
      state.width = 0;
      state.height = 0;
      state.imgFilename = "";
      state.remoteUrl = "";
    },
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updateManufacturerId: (state, action: PayloadAction<string>) => {
      state.manufacturerId = action.payload;
    },
    updateLink: (state, action: PayloadAction<string>) => {
      state.link = action.payload;
    },
    updateMounting: (state, action: PayloadAction<string[]>) => {
      state.mounting = action.payload;
    },
    updateBodyColour: (state, action: PayloadAction<string[]>) => {
      state.bodyColour = action.payload;
    },
    updateIpParticle: (state, action: PayloadAction<number[]>) => {
      state.ipParticle = action.payload;
    },
    updateIpMoisture: (state, action: PayloadAction<number[]>) => {
      state.ipMoisture = action.payload;
    },
    updateColourTemp: (state, action: PayloadAction<number[]>) => {
      state.colourTemp = action.payload;
    },
    updateCri: (state, action: PayloadAction<number[]>) => {
      state.cri = action.payload;
    },
    updateBeamAngles: (state, action: PayloadAction<number[]>) => {
      state.beamAngles = action.payload;
    },
    updateLength: (state, action: PayloadAction<number>) => {
      state.length = action.payload;
    },
    updateWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
    updateHeight: (state, action: PayloadAction<number>) => {
      state.height = action.payload;
    },
    updateImgFilename: (state, action: PayloadAction<string>) => {
      state.imgFilename = action.payload;
    },
    updateRemoteUrl: (state, action: PayloadAction<string>) => {
      state.remoteUrl = action.payload;
    },
  },
});

export const {
  resetForm,
  updateName,
  updateManufacturerId,
  updateLink,
  updateMounting,
  updateBodyColour,
  updateIpParticle,
  updateIpMoisture,
  updateColourTemp,
  updateCri,
  updateBeamAngles,
  updateLength,
  updateWidth,
  updateHeight,
  updateImgFilename,
  updateRemoteUrl,
} = addProductSlice.actions;

export default addProductSlice.reducer;
