import accountReducer from "./slices/accountSlice";
import apartmentReducer from "./slices/apartmentSlice";
import projectReducer from "./slices/projectSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const { configureStore, combineReducers } = require("@reduxjs/toolkit");

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  accountReducer,
  apartmentReducer,
  projectReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
