import { createSlice } from "@reduxjs/toolkit";

//auth reducer
export const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    session: localStorage.getItem("auth-token"),
  },
  reducers: {
    //stores jwt token received after login or register
    setSession: (state, { payload }) => {
      state.session = payload;
    },
  },
});

// export actions
export const { setSession } = authSlice.actions;

export default authSlice.reducer;
