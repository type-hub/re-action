// import { Reducer } from "react";
import { testActions, testReducer } from "../../data";
import { CreateBindedReducerFunc, useBindedReducer } from "../../hooks";
import {
  ACTION,
  ActionCreators,
  CreateBindedActions,
  MaybeDisplayName,
  Reducer,
} from "../../types";
import {
  contextFactory,
  CreateContextFactory,
  resolveDisplayName,
  ResolveDisplayName,
} from "../../utils";

type SetupReducer<
  State,
  Actions extends ACTION,
  AC extends ActionCreators<Actions>,
  DN extends MaybeDisplayName
> = CreateContextFactory<State, Capitalize<`${ResolveDisplayName<DN>}State`>> &
  CreateContextFactory<
    CreateBindedActions<AC>,
    Capitalize<`${ResolveDisplayName<DN>}Actions`>
  > & {
    [K in `use${ResolveDisplayName<DN>}Reducer`]: (
      initialState: State
    ) => CreateBindedReducerFunc<State, Actions, AC>;
  };

export const setupUseReducer = <
  S,
  A extends ACTION,
  AC extends ActionCreators<A>,
  DN extends MaybeDisplayName
>(
  reducer: Reducer<S, A>,
  actionCreators: AC,
  displayName?: DN
): SetupReducer<S, A, AC, DN> => {
  const dn = resolveDisplayName(displayName);

  const stateContext = contextFactory<S>()(
    // TODO: why DN and not dn?
    `${dn}State` as Capitalize<`${DN}State`>
  );
  const actionsContext = contextFactory<CreateBindedActions<AC>>()(
    `${dn}Actions` as Capitalize<`${DN}Actions`>
  );

  const useCurriedBindedReducer = (initialState: S) =>
    useBindedReducer(reducer, actionCreators, initialState);

  return {
    [`use${dn}Reducer`]: useCurriedBindedReducer,
    ...stateContext,
    ...actionsContext,
  } as SetupReducer<S, A, AC, DN>;
};

// ------

// const [state, bindedActions, dispatch] = setupUseReducer(testReducer, testActions, "Counter");
const xxxxxx = setupUseReducer(testReducer, testActions, "Counter");
const counterB = setupUseReducer(testReducer, testActions);

// counterA.
