import { configureStore } from "@reduxjs/toolkit";

//import all reducres

import authSlice from "./auth/auth";

export default configureStore({
  //combine all reducers
  reducer: {
    auth: authSlice,
  },
});
