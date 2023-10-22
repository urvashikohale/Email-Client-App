import { configureStore } from "@reduxjs/toolkit";
import emailListReducer from "../features/EmailListing/EmailListSlice";

export const store = configureStore({
  reducer: {
    emailList: emailListReducer,
  },
});
