import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface QueryState {
  mounting: string;
  bodyColour: string;
  colourTemp: number;
}

const initialState: QueryState = {
  mounting: "",
  bodyColour: "",
  colourTemp: 0,
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
  },
});

export const { updateMounting, updateBodyColour, updateColourTemp } =
  querySlice.actions;

export default querySlice.reducer;
