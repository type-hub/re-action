import { useMemo } from "react"
import {
  ACTION,
  ActionCreators,
  CreateBoundActions,
  DeadTypeAdapter,
  Dispatch,
} from "../../types"
import { getKeys } from "../../utils"

export const useBoundActions = <A extends ACTION, AC extends ActionCreators<A>>(
  dispatch: Dispatch<A>,
  actionsCreators: AC,
): CreateBoundActions<AC> =>
  useMemo(
    () =>
      getKeys(actionsCreators).reduce((acc, k) => {
        acc[k] = (...args: DeadTypeAdapter<Parameters<AC[typeof k]>>): void => {
          const action = actionsCreators[k](...args)
          dispatch(action)
        }

        return acc
      }, {} as CreateBoundActions<AC>),
    [actionsCreators, dispatch],
  )
