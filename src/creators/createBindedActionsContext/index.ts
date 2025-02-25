import { useBindedActions } from "../../hooks";
import {
  ActionCreators,
  CreateActionDispatch,
  CreateBindedActions,
} from "../../types";
import { contextFactory } from "../../utils";

export const createBindedActionsContext =
  <State>() =>
  <AC extends ActionCreators, Name extends Capitalize<string>>(
    actionCreators: AC,
    name: Name
  ) => {
    const actionsContext = contextFactory<CreateBindedActions<AC>>()(name);

    const useCurriedBindedActions = <Dispatch extends CreateActionDispatch<AC>>(
      dispatch: Dispatch
    ) => {
      return useBindedActions(actionCreators, dispatch);
    };

    return {
      ...actionsContext,
      useCurriedBindedActions,
    };
  };
