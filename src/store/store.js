import accountReducer from "./slices/accountSlice";
import apartmentReducer from "./slices/apartmentSlice";
import projectReducer from "./slices/projectSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    accountReducer,
    apartmentReducer,
    projectReducer,
  },
});

export default store;
