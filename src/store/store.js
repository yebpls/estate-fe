import accountReducer from "./slices/accountSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: {
    accountReducer,
  },
});

export default store;
