import { Reducer } from "react";
import { useBindedReducer } from "../../hooks";
import {
  ActionCreators,
  CreateBindedActions,
  DisplayName,
  GetActionTypes,
} from "../../types";
import { contextFactory } from "../../utils";

export const createBindedReducerContext =
  <State>() =>
  <
    AC extends ActionCreators,
    DN extends DisplayName
    //
  >(
    actionCreators: AC,
    displayName: DN
  ) => {
    const stateContext = contextFactory<State>()(displayName);
    const actionsContext = contextFactory<CreateBindedActions<AC>>()(
      `${displayName}Actions` as DisplayName
    );

    const useCurriedBindedReducer = (
      initialState: State,
      reducer: Reducer<State, GetActionTypes<AC>>
    ) => {
      return useBindedReducer(initialState, actionCreators, reducer);
    };

    const hookName: `use${DN}Actions` = `use${displayName}Actions`;

    return {
      ...stateContext,
      ...actionsContext,
      [hookName]: useCurriedBindedReducer,
    } as {
      [K in typeof hookName]: typeof useCurriedBindedReducer;
    } & typeof stateContext &
      typeof actionsContext;
  };

const x = createBindedReducerContext<number>()(
  {
    increment: (amount: number) => ({ type: "increment", payload: amount }),
    decrement: (amount: number) => ({ type: "decrement", payload: amount }),
  },
  "Counter"
);
