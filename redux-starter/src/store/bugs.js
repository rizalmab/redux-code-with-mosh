import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

// Reducer
let lastId = 1;

const bugsSlice = createSlice({
  name: "bugs",
  initialState: [],
  reducers: {
    bugAdded: (bugs, action) => {
      bugs.push({
        id: lastId++,
        description: action.payload.description,
        resolved: false,
      });
    },
    bugResolved: (bugs, action) => {
      const index = bugs.findIndex((bug) => bug.id === action.payload.id);
      bugs[index].resolved = true;
    },
    bugAssigned: (bugs, action) => {
      // change the specific bug's 'assignedTo' property to specific team member
      const index = bugs.findIndex((bug) => bug.id === action.payload.bugId);
      bugs[index].assignedToUserId = action.payload.userId;
    },
  },
});

export const { bugAdded, bugResolved, bugAssigned } = bugsSlice.actions;
export default bugsSlice.reducer;

// Selector
export const getUnresolvedBugs = createSelector(
  (state) => state.bugs,
  (bugs) => bugs.filter((bug) => !bug.resolved)
);

export const getAssignedBugs = (userId) =>
  createSelector(
    (state) => state.bugs,
    (state) => state.users,
    // return an array of objects (bugs) where 'assignedTo' property equals the userId passed as argument
    (bugs, users) => bugs.filter((bug) => bug.assignedToUserId === userId)
  );
