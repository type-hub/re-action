import React from "react";

import { setupReducer } from "../../creators/setupReducer";
import { testActions, testReducer, TestState } from "../../data";
import { ActionCreators, CreateReducer } from "../../types";

// TODO: const store = createStore(rootReducer)
// https://redux.js.org/usage/configuring-your-store
// use reduce as a single source of truth
export const create =
  <State,>() =>
  <
    AC extends ActionCreators,
    Red extends CreateReducer<State, AC>
    //
  >(
    actionCreators: AC,
    reducer: Red
  ) => {
    const {
      ContextStateProvider,
      ContextActionsProvider,
      useContextReducer,
      useContextState,
      useContextActions,
    } = setupReducer<State>()(actionCreators);

    const Comp = ({
      initState,
      children,
    }: {
      initState: State;
      children: React.ReactNode;
    }) => {
      const [state, bindedActions] = useContextReducer(initState, reducer);

      return (
        <ContextStateProvider value={state}>
          <ContextActionsProvider value={bindedActions}>
            <>{children}</>
          </ContextActionsProvider>
        </ContextStateProvider>
      );
    };

    return {
      // TODO: support display name for all keys
      Comp,
      useContextState,
      useContextActions,
    };
  };

const x = create<TestState>()(testActions, testReducer);

const z = x.useContextActions();
