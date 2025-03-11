import { useMemo } from "react";
import {
  ACTION,
  ActionCreators,
  CreateBindedActions,
  Dispatch,
} from "../../types";
import { getKeys } from "../../utils";

export const useBindedActions = <
  A extends ACTION,
  AC extends ActionCreators<A>
>(
  dispatch: Dispatch<A>,
  actionsCreators: AC
): CreateBindedActions<AC> => {
  const bindedActions = useMemo(() => {
    const _keys = getKeys(actionsCreators);

    return _keys.reduce((acc, k) => {
      acc[k] = (...args: Parameters<AC[typeof k]>): void => {
        const action = actionsCreators[k](...args);
        dispatch(action);
      };

      return acc;
    }, {} as CreateBindedActions<AC>);
  }, [actionsCreators, dispatch]);

  return bindedActions;
};
