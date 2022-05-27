import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

const projectSlice = createSlice({
  name: "projects",
  initialState: [],
  reducers: {
    projectAdded: (state, action) => {
      state.push({
        id: ++lastId,
        name: action.payload.name,
      });
    },
  },
});

// console.log(projectSlice);
export const { projectAdded } = projectSlice.actions;
export default projectSlice.reducer;
