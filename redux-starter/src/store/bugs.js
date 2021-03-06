import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { apiCallBegan } from "./api";

// Reducer
let lastId = 1;

const bugsSlice = createSlice({
  name: "bugs",
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugAdded: (bugs, action) => {
      bugs.list.push({
        id: lastId++,
        description: action.payload.description,
        resolved: false,
      });
    },
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id);
      bugs.list[index].resolved = true;
    },
    bugAssigned: (bugs, action) => {
      // change the specific bug's 'assignedTo' property to specific team member
      const index = bugs.list.findIndex(
        (bug) => bug.id === action.payload.bugId
      );
      bugs.list[index].assignedToUserId = action.payload.userId;
    },
    bugsReceived: (bugs, action) => {
      // push the action payload into bugs.list
      bugs.list.push(action.payload);
    },
  },
});

export const { bugAdded, bugResolved, bugAssigned, bugsReceived } =
  bugsSlice.actions;
export default bugsSlice.reducer;

// Action creator
// Create a loadBugs() function
export const loadBugs = () => {
  apiCallBegan({
    url: "bugs",
    onSuccess: "bugs/bugsReceived",
  });
};

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
