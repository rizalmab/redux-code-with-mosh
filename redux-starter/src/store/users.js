import { createSlice } from "@reduxjs/toolkit";

let lastId = 1;

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    addUser: (users, action) => {
      users.push({ id: lastId++, name: action.payload.name });
    },
  },
});

const { actions, reducer } = usersSlice;
export const { addUser } = actions;
export default reducer;
