import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  read: JSON.parse(localStorage.getItem("readMails")) || [],
  unread: [],
  favourite: JSON.parse(localStorage.getItem("favouriteMails")) || [],
  show: [],
  isLoading: false,
  opened: "",
};

export const getEmails = createAsyncThunk("emailList/getEails", () => {
  return fetch("https://flipkart-email-mock.now.sh/")
    .then((res) => res.json())
    .then((data) => data);
});

const emailListSlice = createSlice({
  name: "emailList",
  initialState,
  reducers: {
    mailClicked: (state, action) => {
      state.opened = action.payload;
      if (!state.read.some((m) => m.id === action.payload.id)) {
        state.read.push(action.payload);
        localStorage.setItem("readMails", JSON.stringify(state.read));
      }
      if (state.unread.some((m) => m.id === action.payload.id)) {
        let i = state.unread.findIndex((m) => m.id === action.payload.id);
        if (i > -1) {
          state.unread.splice(i, 1);
        }
      }
    },

    addToFavourite: (state, action) => {
      if (!state.favourite.some((m) => m.id === action.payload.id)) {
        state.favourite.push(action.payload);
        localStorage.setItem("favouriteMails", JSON.stringify(state.favourite));
      }
    },

    removeFromFavourite: (state, action) => {
      let i = state.favourite.findIndex((m) => m.id === action.payload.id);
      if (i > -1) {
        state.favourite.splice(i, 1);
        localStorage.setItem("favouriteMails", JSON.stringify(state.favourite));
      }
    },

    filter: (state, action) => {
      if (action.payload === "read") {
        state.show = state.read;
        state.opened = "";
      }
      if (action.payload === "unread") {
        state.show = state.unread;
        state.opened = "";
      }
      if (action.payload === "favourite") {
        state.show = state.favourite;
        state.opened = "";
      }
    },
  },
  extraReducers: {
    [getEmails.pending]: (state) => {
      state.isLoading = true;
    },
    [getEmails.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.unread = action.payload.list;
      state.show = state.unread;
    },
  },
});

export const { mailClicked, filter, addToFavourite, removeFromFavourite } =
  emailListSlice.actions;

export default emailListSlice.reducer;
