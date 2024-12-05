import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userSlice from "./slices/userSlice";
import cartSlice from "./slices/cartSlice";

// Type definitions for your slices
type Package = {
  packageId: string;
  packageDuration: string;
  packageName: string;
  stayDetails: string;
  country: string;
  flightDetails: string;
  packagePrice: string;
  packageImage: string;
  activities: string[];
};

type UserState = {
  username: string | null;
  jwtToken: string | null;
  userType: string | null;
};

type CartState = {
  cartItems: Package[];
  cartCount: number;
  cartTotal: number;
  clientSecret: string;
};

// The RootState type combines all slices (user, cartDetails)
type RootState = {
  user: UserState;
  cartDetails: CartState;
};

// Persist config for redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "cartDetails"], // Persist user and cart data
};

// Combine reducers
const rootReducer = combineReducers({
  user: userSlice,
  cartDetails: cartSlice,
});

// Apply persistReducer to rootReducer with proper typing
const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/FLUSH",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PERSIST",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

// Create persisted store
export const persistedStore = persistStore(store);

// Export default store
export default store;
