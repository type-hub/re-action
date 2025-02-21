import {
  ActionCreators,
  ActionDispatch,
  CreateBindedActions,
} from "../../types";
import { contextFactory } from "../../utils";
import { useBindedActions } from "../useBindedActions";

export const usePartialSetup =
  <State>() =>
  <AC extends ActionCreators, Name extends Capitalize<string>>(
    actionCreators: AC,
    name: Name
  ) => {
    const stateContext = contextFactory<State>()(name);
    const actionsContext = contextFactory<CreateBindedActions<AC>>()("Actions");

    return <Dispatch extends ActionDispatch>(dispatch: Dispatch) => {
      return {
        ...actionsContext,
        ...stateContext,
        useBindedActions: () => useBindedActions(actionCreators, dispatch),
      };
    };
  };
