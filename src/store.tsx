import { createStore, applyMiddleware, combineReducers, Store, compose } from "redux";
import rootReducer, { YourReducerState, AppAction } from "./reducer/index"; // Import your rootReducer


// Define the state type
type RootState = {
  yourReducer: YourReducerState;
};


// Create the store
const store: Store<RootState, AppAction<any>> = createStore(
  combineReducers<RootState>({
    yourReducer: rootReducer,
  }),
);

export default store;
