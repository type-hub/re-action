import { useMemo } from "react";
import {
  ActionCreators,
  CreateActionDispatch,
  CreateBindedActions,
} from "../../types";
import { keys } from "../../utils";

export const useBindedActions = <
  AC extends ActionCreators,
  AD extends CreateActionDispatch<AC>
>(
  actionsCreators: AC,
  dispatch: AD
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
