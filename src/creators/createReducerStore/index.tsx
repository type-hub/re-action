import React from "react"

import {
  ACTION,
  ActionCreators,
  CreateBoundActions,
  DISPLAY_NAME,
  Reducer,
} from "../../types"
import { ResolveDisplayName, resolveDisplayName } from "../../utils"
import { createReducerContext } from "../createReducerContext"

export const createReducerStore = <
  S,
  A extends ACTION,
  AC extends ActionCreators<A>,
  DN extends DISPLAY_NAME,
>(
  reducer: Reducer<S, A>,
  actionCreators: AC,
  displayName?: DN,
): {
  [K in `use${ResolveDisplayName<DN>}State`]: () => S
} & {
  [K in `use${ResolveDisplayName<DN>}Actions`]: () => CreateBoundActions<AC>
} & {
  [K in `${ResolveDisplayName<DN>}Provider`]: React.FC<{
    initState: S
    children: React.ReactNode
  }>
} => {
  const dn = resolveDisplayName(displayName)

  const {
    ContextStateProvider,
    ContextActionsProvider,
    useContextBoundReducer,
    useContextState,
    useContextActions,
  } = createReducerContext(reducer, actionCreators)

  // TODO: add DN
  const MainProvider = ({
    initState,
    children,
  }: {
    initState: S
    children: React.ReactNode
  }) => {
    const [state, bindedActions] = useContextBoundReducer(initState)

    return (
      <ContextStateProvider value={state}>
        <ContextActionsProvider value={bindedActions}>
          <>{children}</>
        </ContextActionsProvider>
      </ContextStateProvider>
    )
  }

  return {
    [`${dn}Provider`]: MainProvider,
    [`use${dn}State`]: useContextState,
    [`use${dn}Actions`]: useContextActions,
  } as {
    [K in `use${ResolveDisplayName<DN>}State`]: () => S
  } & {
    [K in `use${ResolveDisplayName<DN>}Actions`]: () => CreateBoundActions<AC>
  } & {
    [K in `${ResolveDisplayName<DN>}Provider`]: React.FC<{
      initState: S
      children: React.ReactNode
    }>
  }
}

// const xxx = create(testReducer, testActions);
// const z = x.useContextActions();
