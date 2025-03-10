import { useMemo } from "react";
import {
  ACTION,
  ActionCreators,
  CreateBindedActions,
  Dispatch,
} from "../../types";
import { keys } from "../../utils";

export const useBindedActions = <
  A extends ACTION,
  AC extends ActionCreators<A>
>(
  dispatch: Dispatch<A>,
  actionsCreators: AC
): CreateBindedActions<AC> => {
  const bindedActions = useMemo(() => {
    const _keys = keys(actionsCreators);

    return _keys.reduce((acc, k) => {
      acc[k] = (...args: Parameters<AC[typeof k]>): void => {
        const action = actionsCreators[k](...args) as ReturnType<AC[typeof k]>;

        dispatch(action);
      };

      return acc;
    }, {} as CreateBindedActions<AC>);
  }, [actionsCreators, dispatch]);

  return bindedActions;
};
