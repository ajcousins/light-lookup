import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface QueryState {
  mounting: string;
  bodyColour: string;
}

const initialState: QueryState = {
  mounting: "",
  bodyColour: "",
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
  },
});

export const { updateMounting, updateBodyColour } = querySlice.actions;

export default querySlice.reducer;
