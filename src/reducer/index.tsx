import { Reducer} from "redux"; 

import { YourReducerState , reducer } from "./reducer";

interface AppAction<T> {
  type: string;
  payload: T;
}

const rootReducer: Reducer<YourReducerState, AppAction<any>> = reducer;

export default rootReducer;
export type { YourReducerState, AppAction}