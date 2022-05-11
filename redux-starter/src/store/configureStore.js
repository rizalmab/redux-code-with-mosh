import reducer from "./reducer";
import { configureStore } from "@reduxjs/toolkit";

export default () => {
  return configureStore({ reducer });
};
