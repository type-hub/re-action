import { useMemo } from "react";

export const useBindedActions = <
  ActionCreators extends Readonly<Record<string, (...args: any[]) => any>>,
  Dispatch extends React.Dispatch<
    ReturnType<ActionCreators[keyof ActionCreators]>
  >
>(
  actions: ActionCreators,
  dispatch: Dispatch
) => {
  const binded = useMemo(() => {
    const _keys = Object.keys(actions) as Array<keyof ActionCreators>;

    return _keys.reduce(
      (acc, k) => {
        acc[k] = (...args: Parameters<ActionCreators[typeof k]>) => {
          dispatch(actions[k](...args));
        };
        return acc;
      },
      {} as {
        [K in keyof ActionCreators]: (
          ...args: Parameters<ActionCreators[K]>
        ) => void;
      }
    );
  }, [actions, dispatch]);

  return binded;
};
