import React from "react";

import { setupUseReducer } from "../../creators/setupReducer";
import { testActions, testReducer } from "../../data";
import { ACTION, ActionCreators, Reducer } from "../../types";

// TODO: const store = createStore(rootReducer)
// https://redux.js.org/usage/configuring-your-store
// use reduce as a single source of truth
export const create = <
  S,
  A extends ACTION,
  AC extends ActionCreators<A>
  //  DN extends MaybeDisplayName
  //
>(
  reducer: Reducer<S, A>,
  actionCreators: AC
) => {
  const {
    ContextStateProvider,
    ContextActionsProvider,
    useContextReducer,
    useContextState,
    useContextActions,
  } = setupUseReducer(reducer, actionCreators);

  const Comp = ({
    initState,
    children,
  }: {
    initState: S;
    children: React.ReactNode;
  }) => {
    // const [state, bindedActions] = useContextReducer(initState);
    // @ts-ignore
    const [state, bindedActions] = useContextReducer(initState);
    // const x = useContextReducer(initState);

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

const x = create(testReducer, testActions);

const z = x.useContextActions();
