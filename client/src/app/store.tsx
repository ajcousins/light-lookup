import { configureStore } from "@reduxjs/toolkit";
import queryReducer from "../features/query/querySlice";
import addProductReducer from "../features/addProduct/addProductSlice";
import addManufacturerReducer from "../features/addManufacturer/addManufacturerSlice";

export const store = configureStore({
  reducer: {
    query: queryReducer,
    addProduct: addProductReducer,
    addManufacturer: addManufacturerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
