import { useBindedActions } from "../../hooks";
import {
  ActionCreators,
  CreateActionDispatch,
  CreateBindedActions,
  DisplayName,
} from "../../types";
import { contextFactory } from "../../utils";

export const createBindedActionsContext = <
  AC extends ActionCreators,
  DN extends DisplayName
>(
  actionCreators: AC,
  displayName: DN
) => {
  const actionsContext = contextFactory<CreateBindedActions<AC>>()(displayName);

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
