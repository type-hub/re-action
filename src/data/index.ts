import { GetActionTypes } from "../types";

export type TestState = {
  count: number;
};

export const testActions = {
  increment: (amount: number) => ({ type: "increment", payload: amount }),
  decrement: (amount: string) => ({ type: "decrement", payload: amount }),
};

export const testReducer = (
  state: TestState,
  action: GetActionTypes<typeof testActions>
): TestState => {
  return state;
};
