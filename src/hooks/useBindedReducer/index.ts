import { Reducer, ReducerState, useReducer } from "react";
import {
  ActionCreators,
  CreateActionDispatch,
  CreateBindedActions,
  GetActionTypes,
} from "../../types";
import { useBindedActions } from "../useBindedActions";

export const useBindedReducer = <InitialState, AC extends ActionCreators>(
  initialState: InitialState,
  actionsCreators: AC,
  reducer: Reducer<InitialState, GetActionTypes<AC>>
): [
  ReducerState<Reducer<InitialState, GetActionTypes<AC>>>,
  CreateBindedActions<AC>,
  CreateActionDispatch<AC>
] => {
  // TODO: support init func
  const [state, dispatch] = useReducer(reducer, initialState);
  const bindedActions = useBindedActions(actionsCreators, dispatch);

  // TODO: dispatch is here due to incremental refactor usage
  return [state, bindedActions, dispatch];
};
