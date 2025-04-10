import { useReducer } from "react"
import {
  ACTION,
  ActionCreators,
  CreateBoundActions,
  Dispatch,
  Reducer,
} from "../../types"
import { useBoundActions } from "../useBoundActions"

// export type CreateBindedReducerFunc<
//   S,
//   A extends ACTION,
//   AC extends ActionCreators<A>,
// > = (
//   reducer: Reducer<S, A>,
//   actionsCreators: AC,
//   initialState: S,
// ) => [S, CreateBoundActions<AC>, CreateDispatchFromActionCreators<AC>]

export const useBoundReducer = <
  S,
  A extends ACTION,
  AC extends ActionCreators<A>,
>(
  reducer: Reducer<S, A>,
  actionsCreators: AC,
  initialState: S,
): [S, CreateBoundActions<AC>, Dispatch<A>] => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const bindedActions = useBoundActions(
    dispatch as unknown as Dispatch<ACTION>,
    actionsCreators,
  )

  // INFO: dispatch is here due to incremental refactor usage
  return [state, bindedActions, dispatch]
}
