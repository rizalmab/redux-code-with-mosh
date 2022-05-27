import axios from "axios";
import * as actions from "../api";

// const action = {
//   type: "apiCallBegan",
//   payload: {
//     url: "bugs",
//     method: "get",
//     data: {},
//     onSuccess: "bugsReceived",
//     onError: "apiRequestFailed",
//   },
// };

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    // this is a middleware
    // it will check whether the action passed in is a function. If it is a function, call the function. It probably has
    //      async logic in it. Then dispatch the result from the resolved promise.
    // if it is not a function, but a plain object, call the next function and pass the action as an argument.

    if (action.type !== actions.apiCallBegan.type) return next(action);

    next(action);

    const { url, method, data, onSuccess, onError } = action.payload;

    try {
      const response = await axios.request({
        baseURL: "http://localhost:9001/api",
        url,
        method,
        data,
      });
      dispatch(actions.apiCallSuccess(response.data));
      dispatch({ type: onSuccess, payload: response.data });
    } catch (err) {
      dispatch(actions.apiCallFailed(err));
      //   dispatch({ type: onError, payload: err });
    }
  };

export default api;
