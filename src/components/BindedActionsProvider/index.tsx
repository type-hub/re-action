import React from "react";

import { setupUseReducer } from "../../creators/setupReducer";
import {
  ACTION,
  ActionCreators,
  CreateBindedActions,
  DISPLAY_NAME,
  Reducer,
} from "../../types";
import { ResolveDisplayName, resolveDisplayName } from "../../utils";

// https://redux.js.org/usage/configuring-your-store
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
  [K in `use${ResolveDisplayName<DN>}State`]: () => S;
} & {
  [K in `use${ResolveDisplayName<DN>}Actions`]: () => CreateBindedActions<AC>;
} & {
  [K in `${ResolveDisplayName<DN>}Provider`]: React.FC<{
    initState: S;
    children: React.ReactNode;
  }>;
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
  } as {
    [K in `use${ResolveDisplayName<DN>}State`]: () => S;
  } & {
    [K in `use${ResolveDisplayName<DN>}Actions`]: () => CreateBindedActions<AC>;
  } & {
    [K in `${ResolveDisplayName<DN>}Provider`]: React.FC<{
      initState: S;
      children: React.ReactNode;
    }>;
  };
};

// const xxx = create(testReducer, testActions);
// const z = x.useContextActions();
