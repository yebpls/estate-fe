import accountReducer from "./slices/accountSlice";
import apartmentReducer from "./slices/apartmentSlice";
import projectReducer from "./slices/projectSlice";
import buildingReducer from "./slices/buildingSlice";
import bookingDistributionReducer from "./slices/bookingDistributionSlice";
import paymentReducer from "./slices/paymentSlice";
import appointmentReducer from "./slices/appointmentSlice";

import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

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
  buildingReducer,
  bookingDistributionReducer,
  paymentReducer,
  appointmentReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
