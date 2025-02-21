export * from "./hooks";
export * from "./types";
export * from "./utils";

/*

#1 => make it workable lib with one hook :)

naming: Partial/ / Secondary?

- hook: single
- hook: usePartialSetup (no useReduecr, full output)
- hook: useFullSetup (all hooks, full output)

- Comp: context only wrapper for props:children
- Comp: no useReducer <PartialReAction {...{ data, name }}> + useNameAction, useNameState
- Comp: useReducer: <ReAction {...{ data, name, actions }}> + useNameAction, useNameState - how to update passed state? useEffect?

use as redux refactor tool -> mapper for multi useState? should allow to make gradual transition to useReducer
should be available at least for primitives action.setOpenOn

*/
