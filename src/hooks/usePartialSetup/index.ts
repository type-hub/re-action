import {
  ActionCreators,
  ActionDispatch,
  CreateBindedActions,
} from "../../types";
import { contextFactory } from "../../utils";
import { useBindedActions } from "../useBindedActions";

export const usePartialSetup =
  <State>() =>
  <
    Dispatch extends ActionDispatch,
    AC extends ActionCreators,
    Name extends Capitalize<string>
  >(
    dispatch: Dispatch,
    actionCreators: AC,
    name: Name
  ) => {
    const stateContext = contextFactory<State>()(name);
    const actionsContext = contextFactory<CreateBindedActions<AC>>()("Actions");

    return () => {
      const bindedActions = useBindedActions(actionCreators, dispatch);

      return {
        ...actionsContext,
        ...stateContext,
        bindedActions,
      };
    };
  };
