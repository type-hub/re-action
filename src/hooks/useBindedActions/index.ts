import { useMemo } from "react";
import { CreateBindedActions } from "../../types";

export const useBindedActions = <
  AC extends Readonly<Record<string, (...args: any[]) => any>>,
  Dispatch extends React.Dispatch<ReturnType<AC[keyof AC]>>
>(
  actionsCreators: AC,
  dispatch: Dispatch
) => {
  const binded = useMemo(() => {
    const _keys = Object.keys(actionsCreators) as Array<keyof AC>;

    return _keys.reduce((acc, k) => {
      acc[k] = (...args: Parameters<AC[typeof k]>) => {
        dispatch(actionsCreators[k](...args));
      };
      return acc;
    }, {} as CreateBindedActions<AC>);
  }, [actionsCreators, dispatch]);

  return binded;
};
