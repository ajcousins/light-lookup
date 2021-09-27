import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface addProductState {
  name: string;
  manufacturerId: string;
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
}

// When mounting options are added and then removed.. it looks like state
// reverts to "null", rather than an empty array, per intial state.
// How does GraphQL handle null and []?

const initialState: addProductState = {
  name: "",
  manufacturerId: "",
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
};

export const addProductSlice = createSlice({
  name: "addProduct",
  initialState,
  reducers: {
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updateManufacturerId: (state, action: PayloadAction<string>) => {
      state.manufacturerId = action.payload;
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
  },
});

export const {
  updateName,
  updateManufacturerId,
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
} = addProductSlice.actions;

export default addProductSlice.reducer;
