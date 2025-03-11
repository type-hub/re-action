// import { Reducer } from "react";
import { CreateBindedReducerFunc, useBindedReducer } from "../../hooks";
import {
  ACTION,
  ActionCreators,
  CreateBindedActions,
  DISPLAY_NAME,
  Reducer,
} from "../../types";
import {
  contextFactory,
  CreateContextFactory,
  resolveDisplayName,
  ResolveDisplayName,
} from "../../utils";

type StateContext<State, DN extends string> = CreateContextFactory<
  State,
  `${ResolveDisplayName<DN>}State`
>;

type ActionContext<
  Actions extends ACTION,
  AC extends ActionCreators<Actions>,
  DN extends string
> = CreateContextFactory<
  CreateBindedActions<AC>,
  `${ResolveDisplayName<DN>}Actions`
>;

type HookContext<
  State,
  Actions extends ACTION,
  AC extends ActionCreators<Actions>,
  DN extends string
> = {
  [K in `use${ResolveDisplayName<DN>}Reducer`]: (
    initialState: State
  ) => ReturnType<CreateBindedReducerFunc<State, Actions, AC>>;
};

type SetupReducer<
  State,
  Actions extends ACTION,
  AC extends ActionCreators<Actions>,
  DN extends string
> = StateContext<State, DN> &
  ActionContext<Actions, AC, DN> &
  HookContext<State, Actions, AC, DN>;

export const setupUseReducer = <
  S,
  A extends ACTION,
  AC extends ActionCreators<A>,
  DN extends DISPLAY_NAME
>(
  reducer: Reducer<S, A>,
  actionCreators: AC,
  displayName?: DN
): SetupReducer<S, A, AC, DN> => {
  const dn = resolveDisplayName(displayName);

  const stateDn: `${typeof dn}State` = `${dn}State`; // TODO: fix capitalization
  const stateContext = contextFactory<S, typeof stateDn>(stateDn);

  const actionDn: `${typeof dn}Actions` = `${dn}Actions`;
  const actionsContext = contextFactory<
    CreateBindedActions<AC>,
    typeof actionDn
  >(actionDn);

  const useCurriedBindedReducer = (initialState: S) =>
    useBindedReducer(reducer, actionCreators, initialState);

  return {
    [`use${dn}Reducer`]: useCurriedBindedReducer,
    ...stateContext,
    ...actionsContext,
  } as SetupReducer<S, A, AC, DN>;
};

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
