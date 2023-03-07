import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store/store";
import { User } from "types";

export interface UserState {
  currentUser: User;
}

const initialState = {
  currentUser: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : {
        _id: null,
        name: null,
        email: null,
        isAdmin: null,
        createdAt: null,
        updatedAt: null,
      },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (user, action) => {
      user.currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(user.currentUser));
    },
    userLogout: (user, action) => {
      user.currentUser.name = null;
      localStorage.removeItem("x-auth-token");
      localStorage.removeItem("user");
    },
  },
});

export const userState = (state: RootState) => state.entities.user;

// This selector return the name of the current user.
export const selectUserName = (state: RootState) =>
  state.entities.user.currentUser.name;

export const { addUser, userLogout } = userSlice.actions;

export default userSlice.reducer;
