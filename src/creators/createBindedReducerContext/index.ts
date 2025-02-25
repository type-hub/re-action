import { Reducer } from "react";
import { useBindedReducer } from "../../hooks";
import {
  ActionCreators,
  CreateBindedActions,
  GetActionTypes,
} from "../../types";
import { contextFactory } from "../../utils";

export const createBindedReducerContext =
  <State>() =>
  <AC extends ActionCreators, Name extends Capitalize<string>>(
    actionCreators: AC,
    name: Name
  ) => {
    const stateContext = contextFactory<State>()(name);
    const actionsContext = contextFactory<CreateBindedActions<AC>>()("Actions");

    const useCurriedBindedReducer = (
      initialState: State,
      reducer: Reducer<State, GetActionTypes<AC>>
    ) => {
      return useBindedReducer(initialState, actionCreators, reducer);
    };

    return {
      ...stateContext,
      ...actionsContext,
      useCurriedBindedReducer,
    };
  };
