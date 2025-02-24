import { useBindedActions } from "../../hooks";
import {
  ActionCreators,
  CreateActionDispatch,
  CreateBindedActions,
} from "../../types";
import { contextFactory } from "../../utils";

export const createBindedActionsContext =
  <State>() =>
  <AC extends ActionCreators, Name extends Capitalize<string>>(
    actionCreators: AC,
    name: Name
  ) => {
    const stateContext = contextFactory<State>()(name);
    const actionsContext = contextFactory<CreateBindedActions<AC>>()("Actions");

    // TODO: rebuild, return obj with useTyped/PreSet/BindedAction func

    return <Dispatch extends CreateActionDispatch<AC>>(dispatch: Dispatch) => {
      return {
        ...actionsContext,
        ...stateContext,
        // TODO: fix later
        bindedActions: (() => useBindedActions(actionCreators, dispatch))(),
      };
    };
  };
