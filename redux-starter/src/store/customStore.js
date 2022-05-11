import { reducer } from "./reducer";

const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => {
    return state;
  };

  const suscribe = (listener) => {
    listeners.push(listener); // listener is a function
  };

  const dispatch = (action) => {
    // Call the reducer to get the new state (with the current state and action)
    state = reducer(state, action);
    // Notify subscribers
    for (let i = 0; i < listeners.length; i++) {
      listeners[i](); // call the functions in listeners (ie. suscribers)
    }
  };

  return {
    suscribe,
    getState,
    dispatch,
  };
};

export default createStore(reducer);
