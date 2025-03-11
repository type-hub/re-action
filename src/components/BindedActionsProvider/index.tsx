import React from "react";

import { setupUseReducer } from "../../creators/setupReducer";
import { testActions, testReducer } from "../../data";
import { ACTION, ActionCreators, DISPLAY_NAME, Reducer } from "../../types";
import { ResolveDisplayName, resolveDisplayName } from "../../utils";

// TODO: const store = createStore(rootReducer)
// https://redux.js.org/usage/configuring-your-store
// use reduce as a single source of truth
export const create = <
  S,
  A extends ACTION,
  AC extends ActionCreators<A>,
  DN extends DISPLAY_NAME
>(
  reducer: Reducer<S, A>,
  actionCreators: AC,
  displayName?: DN
): {
  [K in `use${ResolveDisplayName<DN>}State`]: any;
} => {
  const dn = resolveDisplayName(displayName);

  const {
    ContextStateProvider,
    ContextActionsProvider,
    useContextReducer,
    useContextState,
    useContextActions,
  } = setupUseReducer(reducer, actionCreators);

  const MainProvider = ({
    initState,
    children,
  }: {
    initState: S;
    children: React.ReactNode;
  }) => {
    const [state, bindedActions] = useContextReducer(initState);

    return (
      <ContextStateProvider value={state}>
        <ContextActionsProvider value={bindedActions}>
          <>{children}</>
        </ContextActionsProvider>
      </ContextStateProvider>
    );
  };

  const providerKey: `${typeof dn}Provider` = `${dn}Provider`;
  const stateKey: `use${typeof dn}State` = `use${dn}State`;
  const actionsKey: `use${typeof dn}Actions` = `use${dn}Actions`;

  return {
    [providerKey]: MainProvider,
    [stateKey]: useContextState,
    [actionsKey]: useContextActions,
  };
};

const x = create(testReducer, testActions, "XXX");

const z = x.useContextActions();
