// import React, { Reducer } from "react";

import { createBindedReducerContext } from "../../creators/createBindedReducerContext";
import { ActionCreators } from "../../types";

export const TODO = "TODO: solve types from return to dispatch";

const create =
  <State,>() =>
  <AC extends ActionCreators, Name extends Capitalize<string>>(
    actionCreators: AC,
    name: Name
  ) => {
    createBindedReducerContext<State>()(actionCreators, name);
  };
