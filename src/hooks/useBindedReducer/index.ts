// KILL
import { useReducer } from "react";
import {
  ACTION,
  ActionCreators,
  CreateActionDispatch,
  CreateBindedActions,
  Dispatch,
  Reducer,
} from "../../types";
import { useBindedActions } from "../useBindedActions";

export type CreateBindedReducerFunc<
  S,
  A extends ACTION,
  AC extends ActionCreators<A>
> = (
  reducer: Reducer<S, A>,
  actionsCreators: AC,
  initialState: S
) => [S, CreateBindedActions<AC>, CreateActionDispatch<AC>];

export const useBindedReducer = <
  S,
  A extends ACTION,
  AC extends ActionCreators<A>
>(
  reducer: Reducer<S, A>,
  actionsCreators: AC,
  initialState: S
): [S, CreateBindedActions<AC>, Dispatch<A>] => {
  // ) => {
  // ): CreateBindedReducer<Reducer, AC, State> => {
  // TODO: support init func
  const [state, dispatch] = useReducer(reducer, initialState);
  const bindedActions = useBindedActions(
    dispatch as unknown as Dispatch<ACTION>,
    actionsCreators
  );

  // INFO: dispatch is here due to incremental refactor usage
  // TODO: why array?
  return [state, bindedActions, dispatch];
};

//

// const [state, bindedActions, dispatch] = useBindedReducer(testReducer, testActions, testInitState);
// const zzzzzz = useBindedReducer(testReducer, testActions, testInitState);
