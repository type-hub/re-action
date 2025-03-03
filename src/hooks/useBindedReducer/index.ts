// KILL
import { Reducer, useReducer } from "react";
import {
  ActionCreators,
  CreateActionDispatch,
  CreateBindedActions,
  CreateReducer,
  GetActionTypes,
} from "../../types";
import { useBindedActions } from "../useBindedActions";

export type CreateBindedReducer<State, AC extends ActionCreators> = (
  initialState: State,
  reducer: CreateReducer<State, AC>
) => [State, CreateBindedActions<AC>, CreateActionDispatch<AC>];

export const useBindedReducer = <State, AC extends ActionCreators>(
  initialState: State,
  actionsCreators: AC,
  reducer: Reducer<State, GetActionTypes<AC>>
): [
  //
  State,
  CreateBindedActions<AC>,
  CreateActionDispatch<AC>
] => {
  // TODO: support init func
  const [state, dispatch] = useReducer(reducer, initialState);
  const bindedActions = useBindedActions(actionsCreators, dispatch);

  // TODO: dispatch is here due to incremental refactor usage
  // TODO: why array?
  return [state, bindedActions, dispatch];
};
