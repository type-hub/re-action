import { useBoundActions } from "../../hooks"
import {
  ACTION,
  ActionCreators,
  CreateBoundActions,
  CreateDispatchFromActionCreators,
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

type CreateActionContext<
  AC extends ActionCreators<ACTION>,
  DN extends DISPLAY_NAME | undefined,
> = CreateContextFactory<CreateBoundActions<AC>, ResolveDisplayName<DN>> & {
  [K in `use${ResolveDisplayName<DN>}BoundActions`]: <
    ActionsDispatch extends CreateDispatchFromActionCreators<AC>,
  >(
    dispatch: ActionsDispatch,
  ) => CreateBoundActions<AC>
}

export const createActionContext = <
  //
  AC extends ActionCreators<ACTION>,
  DN extends DISPLAY_NAME,
>(
  actionCreators: AC,
  displayName?: DN,
): CreateActionContext<AC, DN> => {
  const dn = resolveDisplayName(displayName)
  const actionsContext = contextFactory<CreateBoundActions<AC>, typeof dn>(dn)

  const useCurriedBoundActions = (dispatch: Dispatch<GetActionTypes<AC>>) =>
    // TODO: possible error, to wide type
    useBoundActions(dispatch as unknown as Dispatch<ACTION>, actionCreators)

  // TODO: use[Test]Actions
  return {
    ...actionsContext,
    [`use${dn}BoundActions`]: useCurriedBoundActions,
  } as CreateActionContext<AC, DN>
}
