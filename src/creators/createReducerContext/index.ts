import { useBoundReducer } from "../../hooks"
import {
  ACTION,
  ActionCreators,
  CreateBoundActions,
  CreateDispatchFromActionCreators,
  DISPLAY_NAME,
  Reducer,
} from "../../types"
import {
  contextFactory,
  CreateContextFactory,
  resolveDisplayName,
  ResolveDisplayName,
} from "../../utils"

type StateContext<State, DN extends string> = CreateContextFactory<
  State,
  `${ResolveDisplayName<DN>}State`
>

type ActionContext<
  Actions extends ACTION,
  AC extends ActionCreators<Actions>,
  DN extends string,
> = CreateContextFactory<
  CreateBoundActions<AC>,
  `${ResolveDisplayName<DN>}Actions`
>

type HookContext<
  State,
  Actions extends ACTION,
  AC extends ActionCreators<Actions>,
  DN extends string,
> = {
  [K in `use${ResolveDisplayName<DN>}BoundReducer`]: (
    initialState: State,
    // ) => ReturnType<CreateBindedReducerFunc<State, Actions, AC>>
  ) => [State, CreateBoundActions<AC>, CreateDispatchFromActionCreators<AC>]
}

type CreateReducerContext<
  State,
  Actions extends ACTION,
  AC extends ActionCreators<Actions>,
  DN extends string,
> = StateContext<State, DN> &
  ActionContext<Actions, AC, DN> &
  HookContext<State, Actions, AC, DN>

export const createReducerContext = <
  S,
  A extends ACTION,
  AC extends ActionCreators<A>,
  DN extends DISPLAY_NAME,
>(
  reducer: Reducer<S, A>,
  actionCreators: AC,
  displayName?: DN,
): CreateReducerContext<S, A, AC, DN> => {
  const dn = resolveDisplayName(displayName)

  const stateDn: `${typeof dn}State` = `${dn}State`
  const stateContext = contextFactory<S, typeof stateDn>(stateDn)

  const actionDn: `${typeof dn}Actions` = `${dn}Actions`
  const actionsContext = contextFactory<
    CreateBoundActions<AC>,
    typeof actionDn
  >(actionDn)

  const useCurriedBoundReducer = (initialState: S) =>
    useBoundReducer(reducer, actionCreators, initialState)

  return {
    [`use${dn}BoundReducer`]: useCurriedBoundReducer,
    ...stateContext,
    ...actionsContext,
  } as CreateReducerContext<S, A, AC, DN>
}

// ------

// // const [state, bindedActions, dispatch] = setupUseReducer(testReducer, testActions, "Counter");
// const counterA = setupUseReducer(testReducer, testActions, "Counter");
// const counterB = setupUseReducer(testReducer, testActions);

// counterA.useCounterState;
// counterB.useContextState;
// // counterB.

// // counterB.useAAAAAState();
// // counterB.useActions();
// // counterB.useCounterReducer({ count: 0 });
// // counterB.useCounterReducer({ count: 0 });
