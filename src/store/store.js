import accountReducer from "./slices/accountSlice";
import apartmentReducer from "./slices/apartmentSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    accountReducer,
    apartmentReducer,
  },
});

export default store;
