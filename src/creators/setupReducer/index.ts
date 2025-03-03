import { Reducer } from "react";
import { testActions, TestState } from "../../data";
import { CreateBindedReducer, useBindedReducer } from "../../hooks";
import {
  ActionCreators,
  CreateBindedActions,
  GetActionTypes,
  MaybeDisplayName,
} from "../../types";
import {
  contextFactory,
  CreateContextFactory,
  resolveDisplayName,
  ResolveDisplayName,
} from "../../utils";

type SetupReducer<
  State,
  AC extends ActionCreators,
  DN extends MaybeDisplayName
> = CreateContextFactory<State, Capitalize<`${ResolveDisplayName<DN>}State`>> &
  CreateContextFactory<
    CreateBindedActions<AC>,
    Capitalize<`${ResolveDisplayName<DN>}Actions`>
  > & {
    [K in `use${ResolveDisplayName<DN>}Reducer`]: CreateBindedReducer<
      State,
      AC
    >;
  };

export const setupReducer =
  <State>() =>
  <AC extends ActionCreators, DN extends MaybeDisplayName>(
    actionCreators: AC,
    displayName?: DN
  ): SetupReducer<State, AC, DN> => {
    const dn = resolveDisplayName(displayName);

    const stateContext = contextFactory<State>()(
      `${dn}State` as Capitalize<`${DN}State`>
    );
    const actionsContext = contextFactory<CreateBindedActions<AC>>()(
      `${dn}Actions` as Capitalize<`${DN}Actions`>
    );

    const useCurriedBindedReducer = (
      initialState: State,
      reducer: Reducer<State, GetActionTypes<AC>>
    ) => useBindedReducer(initialState, actionCreators, reducer);

    return {
      [`use${dn}Reducer`]: useCurriedBindedReducer,
      ...stateContext,
      ...actionsContext,
    } as SetupReducer<State, AC, DN>;
  };

// ------

const counterA = setupReducer<TestState>()(testActions, "Counter");
const counterB = setupReducer<TestState>()(testActions);
