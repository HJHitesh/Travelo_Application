import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the UserState interface
interface UserState {
  username: string | null;
  jwtToken: string | null;
  userType: string | null; // Add userType to the state
}

// Define the initial state based on UserState
const initialState: UserState = {
  username: null,
  jwtToken: null,
  userType: null, // Initialize userType as null
};

// Create the userSlice with three actions: setCurrentUser, logout, and setUserType
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to set the current user, JWT token, and userType
    setCurrentUser: (
      state,
      action: PayloadAction<{
        username: string;
        jwtToken: string;
        userType: string;
      }>
    ) => {
      const { username, jwtToken, userType } = action.payload;
      state.username = username;
      state.jwtToken = jwtToken;
      state.userType = userType; // Set the userType as well
    },
    // Action to log out and clear the user state
    logout: (state) => {
      state.username = null;
      state.jwtToken = null;
      state.userType = null; // Clear userType on logout
    },
  },
});

// Export the actions so they can be dispatched
export const { setCurrentUser, logout } = userSlice.actions;

// Export the reducer to be used in the store
export default userSlice.reducer;
