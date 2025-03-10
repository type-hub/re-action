import { GetActionTypes } from "../types";

export type TestState = {
  count: number;
};

export const testInitState = {
  count: 0,
};

export const testActions = {
  increment: (amount: number) => ({
    type: "increment" as const,
    payload: amount,
  }),
  decrement: (amount: string) => ({
    type: "decrement" as const,
    payload: amount,
  }),
} as const;

export const testReducer = (
  state: TestState,
  action: GetActionTypes<typeof testActions>
): TestState => {
  return state;
};
