import { configureStore } from "@reduxjs/toolkit";
import { riseReducer } from "./riseReducer";

export const store = configureStore({ reducer: { riseReducer } });
