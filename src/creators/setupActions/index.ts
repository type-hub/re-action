import { testActions } from "../../data";
import { useBindedActions } from "../../hooks";
import {
  ActionCreators,
  CreateActionDispatch,
  CreateBindedActions,
  DisplayName,
  GetActionTypes,
} from "../../types";
import { contextFactory, CreateContextFactory } from "../../utils";

type SetupActions<
  AC extends ActionCreators,
  DN extends DisplayName
> = CreateContextFactory<CreateBindedActions<AC>, DN> & {
  [K in `use${DN}Actions`]: <ActionsDispatch extends CreateActionDispatch<AC>>(
    dispatch: ActionsDispatch
  ) => CreateBindedActions<AC>;
};

export const setupActions = <AC extends ActionCreators, DN extends DisplayName>(
  actionCreators: AC,
  displayName: DN
): SetupActions<AC, DN> => {
  const actionsContext = contextFactory<CreateBindedActions<AC>>()(displayName);

  const useCurriedBindedActions = <Dispatch extends CreateActionDispatch<AC>>(
    dispatch: Dispatch
  ) => useBindedActions(actionCreators, dispatch);

  return {
    ...actionsContext,
    [`use${displayName}Actions`]: useCurriedBindedActions,
  } as SetupActions<AC, DN>;
};

// ------

declare const _dispatch: React.Dispatch<
  //
  GetActionTypes<typeof testActions>
>;

const x = setupActions(testActions, "User");

const a = x.useUserActions(_dispatch);
