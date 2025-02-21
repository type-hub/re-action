import { contextFactory } from "../../utils";
import { useBindedActions } from "../useBindedActions";

export const useSetup =
  <State extends string>() =>
  <
    Dispatch extends React.Dispatch<
      ReturnType<ActionCreators[keyof ActionCreators]>
    >,
    ActionCreators extends Readonly<Record<string, (...args: any[]) => any>>
  >(
    dispatch: Dispatch,
    actionCreators: ActionCreators,
    name: Capitalize<string>
  ) => {
    const bindedActions = useBindedActions(actionCreators, dispatch);

    const cfState = contextFactory<State>()(name);
    const cfActions = contextFactory<typeof bindedActions>()("Actions");

    return {
      bindedActions,
      ...cfActions,
      ...cfState,
    };
  };
