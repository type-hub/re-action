import { useReducer } from "react"
import {
  ACTION,
  ActionCreators,
  CreateBindedActions,
  CreateDispatchFromActionCreators,
  Dispatch,
  Reducer,
} from "../../types"
import { useBindedActions } from "../useBindedActions"

export type CreateBindedReducerFunc<
  S,
  A extends ACTION,
  AC extends ActionCreators<A>,
> = (
  reducer: Reducer<S, A>,
  actionsCreators: AC,
  initialState: S,
) => [S, CreateBindedActions<AC>, CreateDispatchFromActionCreators<AC>]

export const useBindedReducer = <
  S,
  A extends ACTION,
  AC extends ActionCreators<A>,
>(
  reducer: Reducer<S, A>,
  actionsCreators: AC,
  initialState: S,
): [S, CreateBindedActions<AC>, Dispatch<A>] => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const bindedActions = useBindedActions(
    dispatch as unknown as Dispatch<ACTION>,
    actionsCreators,
  )

  // INFO: dispatch is here due to incremental refactor usage
  return [state, bindedActions, dispatch]
}
