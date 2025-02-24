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

    return (
      initialState: State,
      reducer: Reducer<State, GetActionTypes<AC>>
    ) => {
      const [state, bindedActions, dispatch] = useBindedReducer(
        initialState,
        actionCreators,
        reducer
      );

      return {
        ...actionsContext,
        ...stateContext,
        state,
        bindedActions,
        dispatch,
      };
    };
  };
