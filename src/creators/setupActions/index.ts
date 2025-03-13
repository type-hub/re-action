import { useBindedActions } from "../../hooks"
import {
  ACTION,
  ActionCreators,
  CreateActionDispatch,
  CreateBindedActions,
  Dispatch,
  DISPLAY_NAME,
  GetActionTypes,
} from "../../types"
import {
  contextFactory,
  CreateContextFactory,
  ResolveDisplayName,
  resolveDisplayName,
} from "../../utils"

type SetupActions<
  AC extends ActionCreators<ACTION>,
  DN extends DISPLAY_NAME | undefined,
> = CreateContextFactory<CreateBindedActions<AC>, ResolveDisplayName<DN>> & {
  [K in `use${ResolveDisplayName<DN>}BindedActions`]: <
    ActionsDispatch extends CreateActionDispatch<AC>,
  >(
    dispatch: ActionsDispatch,
  ) => CreateBindedActions<AC>
}

export const setupActions = <
  //
  AC extends ActionCreators<ACTION>,
  DN extends DISPLAY_NAME,
>(
  actionCreators: AC,
  displayName?: DN,
): SetupActions<AC, DN> => {
  const dn = resolveDisplayName(displayName)
  const actionsContext = contextFactory<CreateBindedActions<AC>, typeof dn>(dn)

  const useCurriedBindedActions = (dispatch: Dispatch<GetActionTypes<AC>>) =>
    useBindedActions(dispatch as unknown as Dispatch<ACTION>, actionCreators)

  // TODO: use[Test]Actions
  return {
    ...actionsContext,
    [`use${dn}BindedActions`]: useCurriedBindedActions,
  } as SetupActions<AC, DN>
}
