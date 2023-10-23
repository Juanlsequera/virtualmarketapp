import {
  configureStore
} from "@reduxjs/toolkit";
import userReducer from "../slices/authSlice";
import shoppingCartReducer from "../slices/shoppingCart";

const store = configureStore({
  reducer: {
    user: userReducer,
    shoppingCart: shoppingCartReducer,
  },
});

export default store;