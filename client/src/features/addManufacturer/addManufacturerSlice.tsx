import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface addManufacturerState {
  name: string;
  country: string;
  website: string;
  imgFilename: string;
}

const initialState: addManufacturerState = {
  name: "",
  country: "",
  website: "",
  imgFilename: "",
};

export const addManufacturerSlice = createSlice({
  name: "addManufacturer",
  initialState,
  reducers: {
    resetForm: (state) => {
      state.name = "";
      state.country = "";
      state.website = "";
      state.imgFilename = "";
    },
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updateCountry: (state, action: PayloadAction<string>) => {
      state.country = action.payload;
    },
    updateWebsite: (state, action: PayloadAction<string>) => {
      state.website = action.payload;
    },
    updateImgFilename: (state, action: PayloadAction<string>) => {
      state.imgFilename = action.payload;
    },
  },
});

export const {
  resetForm,
  updateName,
  updateCountry,
  updateWebsite,
  updateImgFilename,
} = addManufacturerSlice.actions;

export default addManufacturerSlice.reducer;
