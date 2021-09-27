import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface addProductState {
  name: string;
  manufacturerId: string;
}

const initialState: addProductState = {
  name: "",
  manufacturerId: "",
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
  },
});

export const { updateName, updateManufacturerId } = addProductSlice.actions;

export default addProductSlice.reducer;
