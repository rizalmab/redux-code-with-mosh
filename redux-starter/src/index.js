import configureStore from "./store/configureStore";
import {
  bugAdded,
  bugResolved,
  bugAssigned,
  getUnresolvedBugs,
  getAssignedBugs,
} from "./store/bugs";
import { projectAdded } from "./store/projects";
import { addUser } from "./store/users";
import * as actions from "./store/api";
import { loadBugs } from "./store/bugs";

const store = configureStore();
// console.log("store", store);

store.dispatch(
  actions.apiCallBegan({
    url: "bugs",
    onSuccess: "bugs/bugsReceived",
  })
);

// store.dispatch(loadBugs());

// store.dispatch({
//   type: "apiCallBegan",
//   payload: {
//     url: "bugs",
//     onSuccess: "bugsReceived",
//     onError: "apiRequestFailed",
//   },
// });

// store.dispatch({ type: "error", payload: { message: "An error occured" } });

// store.subscribe(() => {
//   console.log("Store updated!");
// });

// store.dispatch(bugAdded({ description: "Bug 1" }));
// store.dispatch(bugAdded({ description: "Bug 2" }));
// store.dispatch(bugAdded({ description: "Bug 3" }));
// store.dispatch(bugResolved({ id: 1 }));

// store.dispatch(
//   projectAdded({
//     name: "Project 1",
//   })
// );
// store.dispatch(
//   projectAdded({
//     name: "Project 2",
//   })
// );

// // Add users
// store.dispatch(addUser({ name: "Rizal" }));
// store.dispatch(addUser({ name: "Razli" }));

// // Assign bugs
// store.dispatch(bugAssigned({ bugId: 1, userId: 1 }));
// store.dispatch(bugAssigned({ bugId: 2, userId: 2 }));

// console.log("state", store.getState());

// //* Get unresolved bugs
// const unresolvedBugs = getUnresolvedBugs(store.getState());
// console.log("unresolvedBugs", unresolvedBugs);

// //* Get assigned bugs
// const assignedBugs = getAssignedBugs(1)(store.getState());
// console.log("assignedBugs", assignedBugs);
