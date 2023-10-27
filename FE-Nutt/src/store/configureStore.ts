import { createStore } from "redux";
import { rootReducer } from "./Appstate";

const configureStore = () => {
  return createStore(rootReducer, {});
};

export default configureStore;
