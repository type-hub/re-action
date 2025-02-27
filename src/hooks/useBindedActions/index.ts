import { useMemo } from "react";
import {
  ActionCreators,
  CreateActionDispatch,
  CreateBindedActions,
} from "../../types";
import { keys } from "../../utils";

// TODO: local docs/ readme?
export const useBindedActions = <
  // TODO: reverse order of args might be safer
  AC extends ActionCreators,
  Dispatch extends CreateActionDispatch<AC>
>(
  actionsCreators: AC,
  dispatch: Dispatch
) => {
  const bindedActions = useMemo(() => {
    const _keys = keys(actionsCreators);

    return _keys.reduce((acc, k) => {
      acc[k] = (...args: Parameters<AC[typeof k]>): void => {
        dispatch(actionsCreators[k](...args));
      };
      return acc;
    }, {} as CreateBindedActions<AC>);
  }, [actionsCreators, dispatch]);

  return bindedActions;
};
