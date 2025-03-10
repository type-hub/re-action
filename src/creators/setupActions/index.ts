import { testActions } from "../../data";
import { useBindedActions } from "../../hooks";
import {
  ACTION,
  ActionCreators,
  CreateActionDispatch,
  CreateBindedActions,
  Dispatch,
  DisplayName,
  GetActionTypes,
} from "../../types";
import { contextFactory, CreateContextFactory } from "../../utils";

type SetupActions<
  AC extends ActionCreators<ACTION>,
  DN extends DisplayName
> = CreateContextFactory<CreateBindedActions<AC>, DN> & {
  [K in `use${DN}Actions`]: <ActionsDispatch extends CreateActionDispatch<AC>>(
    dispatch: ActionsDispatch
  ) => CreateBindedActions<AC>;
};

export const setupActions = <
  //
  AC extends ActionCreators<ACTION>,
  DN extends DisplayName
>(
  actionCreators: AC,
  displayName: DN
): SetupActions<AC, DN> => {
  const actionsContext = contextFactory<CreateBindedActions<AC>>()(displayName);

  type A = GetActionTypes<AC>;

  const useCurriedBindedActions = (dispatch: Dispatch<A>) =>
    useBindedActions(dispatch as unknown as Dispatch<ACTION>, actionCreators);

  return {
    ...actionsContext,
    [`use${displayName}Actions`]: useCurriedBindedActions,
  } as SetupActions<AC, DN>;
};

// ------

declare const _dispatch: Dispatch<GetActionTypes<typeof testActions>>;

const x = setupActions(testActions, "User");
const a = x.useUserActions(_dispatch);
