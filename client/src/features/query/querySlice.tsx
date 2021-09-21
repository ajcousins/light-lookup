import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface QueryState {
  mounting: string;
  bodyColour: string;
  colourTemp: number;
  cri: number;
  beamAngle: number;
  maxLength: number;
  maxWidth: number;
  maxHeight: number;
}

const initialState: QueryState = {
  mounting: "",
  bodyColour: "",
  colourTemp: 0,
  cri: 0,
  beamAngle: 0,
  maxLength: 0,
  maxWidth: 0,
  maxHeight: 0,
};

export const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    updateMounting: (state, action: PayloadAction<string>) => {
      state.mounting = action.payload;
    },
    updateBodyColour: (state, action: PayloadAction<string>) => {
      state.bodyColour = action.payload;
    },
    updateColourTemp: (state, action: PayloadAction<number>) => {
      state.colourTemp = action.payload;
    },
    updateCri: (state, action: PayloadAction<number>) => {
      state.cri = action.payload;
    },
    updateBeamAngle: (state, action: PayloadAction<number>) => {
      state.beamAngle = action.payload;
    },
    updateMaxLength: (state, action: PayloadAction<number>) => {
      state.maxLength = action.payload;
    },
    updateMaxWidth: (state, action: PayloadAction<number>) => {
      state.maxWidth = action.payload;
    },
    updateMaxHeight: (state, action: PayloadAction<number>) => {
      state.maxHeight = action.payload;
    },
  },
});

export const {
  updateMounting,
  updateBodyColour,
  updateColourTemp,
  updateCri,
  updateBeamAngle,
  updateMaxLength,
  updateMaxWidth,
  updateMaxHeight,
} = querySlice.actions;

export default querySlice.reducer;
