import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the package
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

type CartState = {
  cartItems: Package[];
  cartCount: number;
  cartTotal: number;
  clientSecret: string;
};

const initialState: CartState = {
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
  clientSecret: "",
};

const addCartItem = (cartItems: Package[], itemToAdd: Package) => {
  const updatedCartItems = [...cartItems, itemToAdd];
  return updatedCartItems;
};

const deleteItemInCart = (cartItems: Package[], itemToDelete: Package) => {
  const updatedCartItems = cartItems.filter(
    (cartItem) => cartItem.packageId !== itemToDelete.packageId
  );
  return updatedCartItems;
};

const cartSlice = createSlice({
  name: "cartDetails",
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<Package>) {
      state.cartItems = addCartItem(state.cartItems, action.payload);
      state.cartCount = state.cartItems.length;
      state.cartTotal = state.cartItems.reduce(
        (total, item) => total + parseFloat(item.packagePrice),
        0
      );
    },
    deleteItemFromCart(state, action: PayloadAction<Package>) {
      state.cartItems = deleteItemInCart(state.cartItems, action.payload);
      state.cartCount = state.cartItems.length;
      state.cartTotal = state.cartItems.reduce(
        (total, item) => total + parseFloat(item.packagePrice),
        0
      );
    },
    setCartCount(state, action: PayloadAction<number>) {
      state.cartCount = action.payload;
    },
    setCartTotal(state, action: PayloadAction<number>) {
      state.cartTotal = action.payload;
    },
    setClientSecret(state, action: PayloadAction<string>) {
      state.clientSecret = action.payload;
    },
    reset(state) {
      state.cartItems = initialState.cartItems;
      state.cartCount = initialState.cartCount;
      state.cartTotal = initialState.cartTotal;
      state.clientSecret = initialState.clientSecret;
    },
  },
});

export default cartSlice.reducer;
export const {
  addItemToCart,
  deleteItemFromCart,
  setCartCount,
  setCartTotal,
  setClientSecret,
  reset,
} = cartSlice.actions;
