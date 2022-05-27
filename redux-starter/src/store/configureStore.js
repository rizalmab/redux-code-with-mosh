import reducer from "./reducer";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "./middleware/logger";
import func from "./middleware/func";
import toast from "./middleware/toast";
import api from "./middleware/api";

export default () => {
  return configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware({ serializableCheck: false }),
      logger({ destination: "console" }),
      api,
    ],
  });
};
